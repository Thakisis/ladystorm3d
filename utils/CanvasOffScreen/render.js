import * as THREE from "three"
import mitt from "mitt"
import { extend, createRoot } from "@react-three/fiber"
import { createPointerEvents } from "./events"

export function render(children) {
  extend(THREE)
  
  let root
  let dpr = [1, 2]
  let size = { width: 0, height: 0, top: 0, left: 0, updateStyle: false }
  const emitter = mitt()

  const handleInit = payload => {
    const {
      props,
      drawingSurface: canvas,
      width,
      top,
      left,
      height,
      pixelRatio
    } = payload
    try {
      // Shim the canvas into a fake window/document
      Object.assign(canvas, {
        pageXOffset: left,
        pageYOffset: top,
        clientLeft: left,
        clientTop: top,
        clientWidth: width,
        clientHeight: height,
        style: { touchAction: "none" },
        ownerDocument: canvas,
        documentElement: canvas,
        getBoundingClientRect() {
          return size
        },
        setAttribute() { },
        setPointerCapture() { },
        releasePointerCapture() { },
        addEventListener(event, callback) {
          emitter.on(event, callback)
        },
        removeEventListener(event, callback) {
          emitter.off(event, callback)
        }
      })
      // Create react-three-fiber root
      root = createRoot(canvas)
      // Configure root
      root.configure({
        events: createPointerEvents(emitter),
        size: (size = { width, height, top, left, updateStyle: false }),
        dpr: (dpr = Math.min(Math.max(1, pixelRatio), 2)),
        ...props,
        onCreated: state => {
          if (props.eventPrefix) {
            state.setEvents({
              compute: (event, state) => {
                const x = event[props.eventPrefix + "X"]
                const y = event[props.eventPrefix + "Y"]
                state.pointer.set(
                  (x / state.size.width) * 2 - 1,
                  -(y / state.size.height) * 2 + 1
                )
                state.raycaster.setFromCamera(state.pointer, state.camera)
              }
            })
          }
        }
      })

      // Render children once
      root.render(children)
    } catch (e) {
      postMessage({ type: "error", payload: e?.message })
    }

    // Shim window to the canvas from here on
    self.window = canvas
  }

  const handleResize = ({ width, height, top, left }) => {
    if (!root) return
    root.configure({
      size: (size = { width, height, top, left, updateStyle: false }),
      dpr
    })
  }

  const handleEvents = payload => {
    emitter.emit(payload.eventName, {
      ...payload,
      preventDefault() { },
      stopPropagation() { }
    })
  }

  const handleProps = payload => {
    if (!root) return
    if (payload.dpr) dpr = payload.dpr
    root.configure({ size, dpr, ...payload })
  }

  const handlerMap = {
    resize: handleResize,
    init: handleInit,
    dom_events: handleEvents,
    props: handleProps
  }

  self.onmessage = event => {
    const { type, payload } = event.data
    console.log(event.data)
    const handler = handlerMap[type]
    if (handler) handler(payload)
  }

  // Shims for threejs
  // @ts-ignore
  THREE.ImageLoader.prototype.load = function (
    url,
    onLoad,
    onProgress,
    onError
  ) {
    if (this.path !== undefined) url = this.path + url
    url = this.manager.resolveURL(url)
    const scope = this
    const cached = THREE.Cache.get(url)

    if (cached !== undefined) {
      scope.manager.itemStart(url)
      if (onLoad) onLoad(cached)
      scope.manager.itemEnd(url)
      return cached
    }

    fetch(url)
      .then(res => res.blob())
      .then(res =>
        createImageBitmap(res, {
          premultiplyAlpha: "none",
          colorSpaceConversion: "none"
        })
      )
      .then(bitmap => {
        THREE.Cache.add(url, bitmap)
        if (onLoad) onLoad(bitmap)
        scope.manager.itemEnd(url)
      })
      .catch(onError)
    return {}
  }

  // Shims for web offscreen canvas
  // @ts-ignore
  self.window = {}
  // @ts-ignore
  self.document = {}
  // @ts-ignore
  self.Image = class {
    height = 1
    width = 1
    set onload(callback) {
      callback(true)
    }
  }
}

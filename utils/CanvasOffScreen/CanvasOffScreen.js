import React, { useEffect, useRef } from "react"
import { Canvas as CanvasImpl } from "@react-three/fiber"
import { EVENTS } from "./events"

function isRefObject(ref) {
  return ref && ref.current !== undefined
}

export function CanvasOffScreen({
  eventSource,
  worker,
  fallback,
  style,
  className,
  id,
  ...props
}) {
  const [shouldFallback, setFallback] = React.useState(false)
  const canvasRef = useRef(null)
  const transfered = useRef(null)

  useEffect(() => {
    if (!worker) return
    if (transfered.current) return
    //.log({ ...canvasRef.current })
    const canvas = canvasRef.current
    let offscreen
    try {
      // @ts-ignore
      offscreen = canvasRef.current.transferControlToOffscreen()
      transfered.current = true
    } catch (e) {
      // Browser doesn't support offscreen canvas at all
      console.log(e)
      setFallback(true)
      return
    }

    worker.onmessage = e => {
      if (e.data.type === "error") {
        // Worker failed to initialize
        setFallback(true)
      }
      if (e.data.type === "custom") {
        //console.log(e)
      }
    }


    worker.postMessage(
      {
        type: "init",
        payload: {
          props,
          drawingSurface: offscreen,
          width: canvas.clientWidth,
          height: canvas.clientHeight,
          top: canvas.offsetTop,
          left: canvas.offsetLeft,
          pixelRatio: window.devicePixelRatio
        }
      },
      [offscreen]
    )

    const currentEventSource = isRefObject(eventSource)
      ? eventSource.current
      : eventSource || canvas

    Object.values(EVENTS).forEach(([eventName, passive]) => {
      currentEventSource.addEventListener(
        eventName,
        event => {
          // Prevent default for all passive events
          if (!passive) event.preventDefault()
          // Capture pointer automatically on pointer down
          if (eventName === "pointerdown") {
            event.target.setPointerCapture(event.pointerId)
          } else if (eventName === "pointerup") {
            event.target.releasePointerCapture(event.pointerId)
          }

          worker.postMessage({
            type: "dom_events",
            payload: {
              eventName,
              deltaX: event.deltaX,
              deltaY: event.deltaY,
              pointerId: event.pointerId,
              pointerType: event.pointerType,
              button: event.button,
              buttons: event.buttons,
              altKey: event.altKey,
              ctrlKey: event.ctrlKey,
              metaKey: event.metaKey,
              shiftKey: event.shiftKey,
              movementX: event.movementX,
              movementY: event.movementY,
              clientX: event.clientX,
              clientY: event.clientY,
              offsetX: event.offsetX,
              offsetY: event.offsetY,
              pageX: event.pageX,
              pageY: event.pageY,
              x: event.x,
              y: event.y
            }
          })
        },
        { passive }
      )
    })

    const handleResize = () => {
      worker.postMessage({
        type: "resize",
        payload: {
          width: currentEventSource.clientWidth,
          height: currentEventSource.clientHeight,
          top: currentEventSource.offsetTop,
          left: currentEventSource.offsetLeft
        }
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [worker])

  useEffect(() => {
    if (!worker) return
    worker.postMessage({ type: "props", payload: props })
  }, [worker, props])

  return shouldFallback ? (
    <CanvasImpl id={id} className={className} style={style} {...props}>
      {fallback}
    </CanvasImpl>
  ) : (
    <canvas
      id={id}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "block",
        ...style
      }}
      ref={canvasRef}
    />
  )
}

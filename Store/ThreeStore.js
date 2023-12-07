import { createLoaders, loadModels } from "@/utils/Three"


export const ThreeStore = (set, get) => ({
    loaderState: { loading: false, percent: 0, loadedSize: 0, totalSize: 0, loadingFiles: 0, loadedFiles: 0, files: [] },
    three: {},
    models: {},
    run(name, payload, cloned = true) {
        const payloadCloned = cloned ? structuredClone(payload) : payload
        self.postMessage({ type: "zustand", name, payloadCloned })
    }
    ,
    Actions: {
        initCanvas(threeParams) {
            const loaders = createLoaders(threeParams.gl)
            set({ three: { threeParams, loaders } })
            //get().Actions.preload()

        },
        async preload() {
            console.log("preload")
            const { loaders } = get().three
            const { onProgressLoad, onCompleteLoad } = get().Actions
            loadModels({ loaders, onProgressLoad, onCompleteLoad })
        }
        ,
        onProgressLoad(e) {

            get().runAction({ name: 'onProgress', payload: e })
        }
        ,
        onCompleteLoad(e) {

            get().runAction({ name: 'onComplete', payload: e.name })

        },

    }
})



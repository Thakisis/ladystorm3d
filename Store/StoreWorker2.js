import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { ModelScenes } from '@/Data'
import { createLoaders, loadModels } from '@/utils/Three'


export const useStore = create(immer((set, get) => ({
    loaderState: { loading: false, percent: 0, loadedSize: 0, totalSize: 0, loadingFiles: 0, loadedFiles: 0, files: [] },
    isWorker: false,
    created: false,
    initialized: false,
    three: {},
    models: {},
    audio: false,

    initOffScreen(threeParams) {
        if (get().initialized)
            return
        set({ isWorker: true })
        const runActionWorker = get().Actions
        set({ runAction: runActionWorker })
        initCanvas(threeParams)

    },
    Actions: {
        initCanvas(threeParams) {
            const loaders = createLoaders(threeParams.gl)
            set({ three: { threeParams, loaders: loaders }, initialized: true })
            get().Actions.preload()
        },

        async preload() {
            console.log('preload')
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
            console.log("complete")
            get().runAction({ name: 'onComplete', payload: e.name })

        },
        // call Action using Worker message
        runActionWorker({ name, payload }) {
            const { isWorker, Actions } = get()
            self.postMessage({ type: "zustand", name, payload })


        },




    }
})))



if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store three', useStore)
}
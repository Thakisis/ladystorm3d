import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { connectMain } from './setWorkerStore'
export const useStoreThree = create((set, get) => ({
    isWorker: false,
    initialized: false,
    three: {},
    models: {},
    getThree: get,
    run: () => { },
    initThree({ threeParams, isWorker, getMain }) {
        if (get().initialized)
            return
        connectMain(set, get, isWorker, getMain)
        get().run('logMain', "hola")
    },
    Actions: {
        initCanvas(threeParams) {

            //const loaders = createLoaders(threeParams.gl)
            const loaders = ""
            set({ three: { threeParams, loaders } })
            //get().Actions.preload()
        },
        log() {

        },
        loaderState: { loading: false, percent: 0, loadedSize: 0, totalSize: 0, loadingFiles: 0, loadedFiles: 0, files: [] },

        async preload() {
            console.log("preload")
            const { loaders } = get().three
            const { onProgressLoad, onCompleteLoad } = get().Actions
            loadModels({ loaders, onProgressLoad, onCompleteLoad })
        },
        log() {

        }
        ,
        onProgressLoad(e) {
            get().run("onProgress", e)
        }
        ,
        onCompleteLoad(e) {
            console.log("progress", e)
        },
    }

}))



if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store Three', useStoreThree)
}

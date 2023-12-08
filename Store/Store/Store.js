import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { immer } from 'zustand/middleware/immer'
import { CreateWorker } from '@/utils/worker'
import { ThreeStore } from './ThreeStore'
import { initialize } from 'next/dist/server/lib/render-server'

export const useStore = create(immer((set, get) => ({
    created: false,

    worker: undefined,
    isWorker: true,
    activeRoute: undefined,
    darkTheme: true,
    audio: false,

    Actions: {
        initScreen(threeParams) {
            //configureStore(set, get, true)
            //get().Actions.initCanvas(threeParams)
        },
        //create Worker, add Event Listeners, 
        init() {
            //  configureStore(set, get, true)

        },
        onProgress(e) {
            console.log("progress")
        },
        onComplete(e) {
            console.log("completed")

        }
    }
})))




if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store three', useStore)
}
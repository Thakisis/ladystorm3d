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


function configureStore(set, get, inWorker = true) {
    const worker = CreateWorker()

    if (worker && inWorker) {
        function runCall({ message }) {
            if (message.data.type !== 'zustand')
                return
            const { name, payload } = message.data
            get().Actions[name](payload)
        }
        worker.addEventListener('message', runCall)
        function runThreeWorker({ name, payload }) {
            worker.postMessage({ type: "zustand", name: name, payload })
        }
        set({ run: runCall, isWorker: true, worker: worker, runThree: runThreeWorker })

    }
    const runCallRemove = get().runCall

    function runThreeMain({ name, payload }) {

        get().Actions[name](payload)
    }

    worker.terminate()
    set({ run: runThreeMain, worker: false, worker: undefined })
}




if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store three', useStore)
}
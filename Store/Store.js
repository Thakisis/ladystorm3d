import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { immer } from 'zustand/middleware/immer'
import { CreateWorker } from '@/utils/worker'
import { connectWorker } from './setWorkerStore'
import { ThreeStore } from './ThreeStore'

export const useStore = create(immer((set, get) => ({
    initialized: false,

    worker: typeof window !== "undefined" && CreateWorker(),
    isWorker: true,
    activeRoute: undefined,
    darkTheme: true,
    audio: false,
    initOnScreen(threeParams) {

    },
    Actions: {
        //create Worker, add Event Listeners, 
        init() {
            connectWorker(set, get)
            get().run({ name: 'text', payload: "payload" })
        },
        runActionWorker({ name, payload }) {
            const worker = get().worker
            worker.postMessage
        },

        runActionStore({ name, payload }) {
            const Actions = get().Actions
            Actions[name](payload)
        },
        onProgress(e) {
            console.log("progress")
        },
        onComplete(e) {
            console.log("complete")
        },
        workerRunning(payload) {
            console.log("-", payload)
        }


    }
})))


if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store three', useStore)
}
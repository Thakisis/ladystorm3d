import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { connectWorker, disconnectWorker } from './setWorkerStore'


export const useStore = create((set, get) => ({
    initialized: false,
    loading: { percent: 0, complete: false },
    worker: null,
    isWorker: true,
    activeRoute: undefined,
    darkTheme: true,
    audio: false,
    getMain: get,
    initMain(getThree) {
        disconnectWorker(set, get, getThree)

    },
    Actions: {
        setWorker(worker) {

            set({ worker: worker })
            connectWorker(set, get)
        },
        //create Worker, add Event Listeners, 
        init() {

            //get().run({ name: 'text', payload: "payload" })
        },
        logMain(e) {

        },

        onProgress({ loaded, size }) {

            set({ loading: { percent: loaded / size * 100 } })
        },
        async onComplete(e) {
            await sleep(1000)
            console.log("complete store")
            set(({ loading }) => ({ loading: { ...loading, complete: true } }))

        },


    }
}))

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useStore)
}


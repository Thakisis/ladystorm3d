import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { immer } from 'zustand/middleware/immer'
import { CreateWorker } from '@/utils/worker'
import { ThreeStore } from './ThreeStore'

export const useStore = create(immer((set, get) => ({
    created: false,

    worker: typeof window !== "undefined" && CreateWorker(),
    isWorker: true,
    activeRoute: undefined,
    darkTheme: true,
    audio: false,
    initOnScreen(threeParams) {
        if (get().initialized)
            return
        const runActionStore = get().Actions.runActionStore
        const { Actions: ActionThree, ...threeState } = ThreeStore(set, get)
        const Actions = get().Actions
        set({
            isWorker: false,
            runAction: runActionStore,
            ...threeState,
            Actions: { ...Actions, ...ActionThree }
        })
        const worker = get().worker
        worker.terminate()
        get().Actions.initCanvas(threeParams)
    },
    Actions: {
        //create Worker, add Event Listeners, 
        init() {
            const worker = get().worker
            worker.addEventListener('message', (message) => {
                if (message.data.type !== 'zustand')
                    return
                const { name, payload } = message.data
                get().runAction(name, payload)
            })
            const runAction = get().Actions.runActionWorker
            set({ runAction: runAction })


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
        }


    }
})))

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store three', useStore)
}
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { connectMain } from './setWorkerStore'
import { ThreeStore } from './ThreeStore'
export const useStore = create(immer((set, get) => ({

    isWorker: false,
    initialized: false,
    initOffScreen(threeParams) {
        connectMain(set, get)
        console.log(get())
        /*
        if (get().initialized)
            return
        const runActionWorker = get().Actions.runActionWorker
        const { Actions: ActionThree, ...threeState } = ThreeStore(set, get)
        const Actions = get().Actions
        set({
            isWorker: true,
            runAction: runActionWorker,
            ...threeState,
            Actions: { ...Actions, ...ActionThree }

        })
        get().Actions.initCanvas(threeParams)
        console.log("init canvas offline")
        self.postMessage({ type: "zustand", name: "canvas", value: true })*/

    },
    Actions: {
        runActionWorker({ name, payload }) {
            const { isWorker, Actions } = get()
            self.postMessage({ type: "zustand", name, payload })


        },

    }
})))




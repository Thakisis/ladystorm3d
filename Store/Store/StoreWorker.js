import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { ThreeStore } from './ThreeStore'
export const useStore = create(immer((set, get) => ({

    isWorker: false,
    initialized: false,
    initOffScreen(threeParams) {

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
        //self.addEventListener('message', ({ data }=> )
    },
    Actions: {
        runActionWorker({ name, payload }) {
            const { isWorker, Actions } = get()
            self.postMessage({ type: "zustand", name, payload })


        },

    }
})))




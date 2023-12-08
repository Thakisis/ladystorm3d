import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { connectMain } from './setWorkerStore'
export const useStore = create(immer((set, get) => ({
    isWorker: false,
    initialized: false,
    initOffScreen(threeParams) {
        connectMain(set, get)
        const initCanvas = get().Actions.initCanvas
        initCanvas(threeParams)
    },
    Actions: {

    }
})))




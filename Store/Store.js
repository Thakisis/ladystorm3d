import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { immer } from 'zustand/middleware/immer'
import { CreateWorker } from '@/utils/worker'


export const useStore = create(immer((set, get) => ({
    created: false,
    worker: typeof window !== "undefined" && CreateWorker(),
    activeRoute: undefined,
    darkTheme: true,
    audio: false,
    Actions: {
        init() {
            const worker = CreateWorker()
            set({ worker: worker })
        }
    }
})))



if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useStore)
}
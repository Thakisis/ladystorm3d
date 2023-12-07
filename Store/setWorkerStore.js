import { ThreeStore } from "./ThreeStore"
export function connectWorker(set, get) {
    const worker = get().worker
    const Actions = get().Actions
    function listenerWorker(message) {
        const { type, name, payload } = message.data
        if (type === "zustand")
            Actions[name](payload)
    }
    function run({ name, payload, cloned = true }) {
        const payloadCloned = cloned ? structuredClone(payload) : payload
        worker.postMessage({ type: "zustand", name, payloadCloned })
    }
    worker.addEventListener("message", (message) => listenerWorker(message))
    set({ initialized: true, workerListener: listenerWorker, initialized: true, run: run })
}
export function connectMain(set, get) {

    function listenerMain(message) {
        const Actions = get().Actions
        const { type, name, payload } = message.data
        if (type === "zustand") {
            console.log('message')
            Actions[name](payload)
        }
    }
    function run({ name, payload, cloned = true }) {
        const payloadCloned = cloned ? structuredClone(payload) : payload
        worker.postMessage({ type: "zustand", name, payloadCloned })
    }
    self.addEventListener("message", (message) => listenerWorker(message))
    const Actions = get().Actions
    const { Actions: threeActions, ...otherProps } = ThreeStore(set, get)
    set({ initialized: true, mainListener: listenerMain, isWorker: true, run: run, Actions: { ...threeActions, ...Actions }, ...otherProps })

}





// Connect worker establish function for comunication between both treads using post message and event listener
export function connectWorker(set, get) {

    const worker = get().worker

    // each time three store (in worker) try to call 
    // main thread store function a message will be send to 
    // worker with type zustand the listener execute this function
    // in main store Actions with the sended payload
    function listenerWorker(message) {
        const Actions = get().Actions

        const { type, name, payload } = message.data
        if (type === "zustand")
            Actions[name](payload)
    }
    // Run will be use to call function in Worker Thread  using Post Message
    // like worker-main comunicacion should indicate the name of Action and the Payload
    function run(name, payload, cloned = true) {
        const payloadCloned = cloned ? structuredClone(payload) : payload
        worker.postMessage({ type: "zustand", name, payload: payloadCloned })
    }
    worker.addEventListener("message", listenerWorker)
    set({ initialized: true, isWorker: true, workerListener: listenerWorker, run: run })
}

// OffScreen is not supported or worker failed the initializaciones
// r3f will fallback to run in main thread
// Three Store comunicate using getters exchange
// run action now will call directly to action inside sameStore without need of send Messages
export function disconnectWorker(set, get, getThree) {
    //    console.log("connect main to three using getter exchange")
    const worker = get().worker
    const listenerWorker = get().listenerWorker
    //run will run directly the action, no need of Clone the object
    function run({ name, payload }) {
        const Actions = getThree().Actions
        Actions[name](payload)
    }
    //clear listener and remove worker
    worker.removeEventListener("message", listenerWorker)
    worker.terminate()
    //add three Storage to mainStorage
    set({ initialized: true, workerListener: null, isWorker: false, run: run })
}


// r3f will be running in worker
// run will be user to call Action in main Storage (working in main thread) 
// a listener will be listening for post Message from main thread 
//and run the Action in store passing the payload

export function connectMain(set, get, isWorker, getMain) {

    if (isWorker) {
        connectWorkerToMain(set, get)
        return
    }
    connectThreeToMain(set, get, getMain)
    //connectMain(set, get, isWorker, getMain)

}

// r3f will run im main so all comunication will be using the getter exchange of both stores
function connectThreeToMain(set, get, getMain) {
    //    console.log('connect three to main using action getter exchange')
    function run(name, payload) {
        console.log(name, payload, getMain)
        const Actions = getMain().Actions
        Actions[name](payload)
    }
    set({ initialized: false, mainListener: null, isWorker: false, run: run })
}

function connectWorkerToMain(set, get) {
    console.log('connect three to main using worker message')
    function listenerMain(message) {
        const Actions = get().Actions
        const { type, name, payload } = message.data
        if (type === "zustand") {
            console.log('message')
            Actions[name](payload)
        }
    }
    //call an action in MainStorage using self.postmessage
    //by default payload will be cloned to avoid side effects
    //due to uintentional remove of data when is transferedt to worker
    function run(name, payload, cloned = true) {
        const payloadCloned = cloned ? structuredClone(payload) : payload
        self.postMessage({ type: "zustand", name, payload: payloadCloned })
    }
    //setup listener
    self.addEventListener("message", (message) => listenerMain(message))


    set({ initialized: true, mainListener: listenerMain, isWorker: true, run: run })
}




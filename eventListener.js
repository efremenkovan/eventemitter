class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(eventName, callback) {
        if (typeof callback === 'function') {
            let event = this.events[eventName]
            if(!event) {
                event = new Event(eventName)
                this.events[eventName] = event
            }
            event.addCallback(callback)
        } else {
            throw new Error('Event callback should be function')
        }
    }

    off(eventName, callback) {
        if(this.events[eventName]) {
            if(typeof callback === 'function') {
                let event = this.events[eventName]
                if(event) {
                    event.removeCallback(callback)
                    if(event.callbacks.length === 0) delete this.events[eventName]
                }
            } else {
                throw new Error('Event callback should be function')
            }   
        } else {
            console.error(`Error on unsubscribtion!\n No event with name '${eventName}' registered in current eventEmitter`)
        }
    }

    emit(eventName, data) {
        if(this.events[eventName]) {
            let event = this.events[eventName]
            if(event) event.fire(data)
        } else {
            console.error(`Error on emitting!\n No event with name '${eventName}' registered in current eventEmitter`)
        }
    }
}

class Event {
    constructor(name) {
        this.name = name
        this.callbacks = []
    }

    addCallback(callback) {
        this.callbacks.push(callback)
    }

    removeCallback(callback) {
        if(this.callbacks.includes(callback)) {
            this.callbacks.splice(this.callbacks.indexOf(callback),1)
        } else {
            console.error(`No callback ${callback} registerd in '${this.name}' event`)
        }
    }

    fire(data) {
        this.callbacks.forEach(callback => callback(data))
    }
}

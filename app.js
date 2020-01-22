const emitter = new EventEmitter()
const emitterFunction = data => console.log(data)
emitter.on('buttonClick', emitterFunction)

const button = document.createElement('button')
button.innerText = "emit event"
button.addEventListener('click', () => emitter.emit('buttonClick', 'some sort of info'))
document.body.appendChild(button)




// TESTS

// -- Wrong callback format error handling check --
// emitter.on('buttonClick', 'emitterFunction')
// emitter.on('buttonClick', {type: 'function', action: data => console.log(data)})

// -- Undefined callback unsub. error handling check --
// emitter.off('buttonClick', data => console.error(data))
// emitter.off('buttonCluck', data => console.error(data))
// emitter.on('buttonClick', {type: 'function', action: data => console.log(data)})

// -- Emitting undefined event error handling check --
// emitter.emit('buttonClock', 'some sort of info')
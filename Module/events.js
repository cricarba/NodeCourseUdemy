const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('evento', function(){
    console.log('Evento push');
});

emitter.emit('evento');

emitter.on('eventoParame', (arg) => {
    console.log('Evento para', arg.id, arg.Num);
})

emitter.emit('eventoParame',{id : 1, Num : 24});

var EventEmitter = require('events').EventEmitter

var logger = new EventEmitter()

logger.on('error', function(message){
	console.log("ERROR:", message)
})

logger.on('warn', function(message){
	console.log("WARN:", message)
})

logger.on('info', function(message){
	console.log("INFO:", message)
})

logger.emit('error', 'Spilled milk!')
logger.emit('warn', 'Eggs cracked')
logger.emit('info', 'Cooking time is 10 minutes')
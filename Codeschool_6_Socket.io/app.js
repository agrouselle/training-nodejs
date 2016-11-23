var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var redis = require('redis').createClient()

// var messages = []

var storeMessage = function(username, message){
	// messages.push({username: username, message: message})

	// if(messages.length > 10){
	// 	messages.shift()
	// }

	var data = JSON.stringify({username: username, message: message})
	redis.lpush("messages", data, function(err, response){
		redis.ltrim("messages", 0, 9)
	})
}

io.on('connection', function(client){
	console.log("Client connected...")

	client.emit('messages', {message: 'Hello you', username:'Server'})

	client.on('messages', function(data){
		var username = client.username
		console.log(username + ": " + data.message)
		
		data.username = username
		client.broadcast.emit('messages', data)
		client.emit('messages', data)

		// Alternative
		// io.emit('messages', data)

		storeMessage(username, data.message)
	})

	client.on('join', function(data){
		// messages.forEach(function(message){
		// 	client.emit('messages', message)
		// })

		redis.lrange("messages", 0, -1, function(err, messages){
			messages = messages.reverse()
			messages.forEach(function(message){
				message = JSON.parse(message)
				client.emit('messages', message)
			})
		})	

		client.username = data.username
		client.broadcast.emit('add_chatter', {username: data.username})
		redis.sadd('chatters', data.username)

		redis.smembers('chatters', function(err, names){
			names.forEach(function(name){
				console.log(name)
				client.emit('add_chatter', {username: name})
			})
		})

		console.log(client.username + ' joined the chat')
	})

	client.on('disconnect', function(username){
		console.log(client.username)

		client.broadcast.emit('remove_chatter', {username: client.username})
		redis.srem('chatters', client.username)
	})
})

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

server.listen(8080)
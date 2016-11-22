var http = require('http')
var fs = require('fs')

// Alternative syntax
// http.createServer()
// http.on('request', function(request, response){})

http.createServer(function(request, response){
	console.log("Request received. Returning response...")

	response.setHeader('Content-Type', 'text/html')
	response.writeHead(200)

	fs.readFile('index.html', function(error, content){
		response.write(content)
		response.end()
	})
 	
}).listen(8080)

http.on('close', function(){
	console.log("Closing down the server...")
})

console.log('Listening on port 8080')
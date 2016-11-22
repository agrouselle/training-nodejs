var http = require('http')

http.createServer(function(request, response){
	response.writeHead(200)

	// Alternative
	// request.pipe(response)

	request.on('readable', function(){
		var chunk = null

		while(null !== (chunk = request.read())){
			// console.log("Chunk: ", chunk.toString())
			response.write(chunk)
		}
	})

	request.on('end', function(){
		response.end();
	})
}).listen(8080)

console.log("Listening on port 8080...")


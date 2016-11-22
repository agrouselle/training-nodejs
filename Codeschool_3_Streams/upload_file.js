var fs = require('fs')
var http = require('http')

http.createServer(function(request, response){
	var newFile = fs.createWriteStream('uploaded_readme_file.md')
	request.pipe(newFile)

	request.on('end', function(){
		response.end('uploaded!')
	})

}).listen(8080)

console.log("Listening to port 8080...")
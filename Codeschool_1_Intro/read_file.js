var fs = require('fs')
var file = "index.html"

console.log("Reading " + file + " synchronously")
var content = fs.readFileSync(file)
console.log("Reading is done. Content is:", content)
console.log("Doing something else...")

console.log("------")

console.log("Reading " + file + " asynchronously")
fs.readFile(file, function(error, content){
	console.log("Reading is done. Content is:", content)
})
console.log("Doing something else...")
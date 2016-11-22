var foo = function(){
	console.log("foo, I'm public")
}

var bar = function(){
	console.log("bar, I'm public")
}

var baz = function(){
	console.log("baz, I'm private")
}

exports.foo = foo
exports.bar = bar
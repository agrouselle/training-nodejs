var hello = require('./custom_hello')
var gb = require('./custom_goodbye')

hello();
gb.goodbye();


var my_module = require('./my_module')
my_module.foo()
my_module.bar()
// my_module.baz() // Can't call baz() as it is private


var makeRequest = require('./make_request')
makeRequest("Hello, this is dog")
makeRequest("How are you today?")
var express = require('express')
var request = require('request')
var url = require('url')
var Twitter = require('twitter')

var app = express()



app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html')
})

app.get('/search/:search', function(req, response){
	var search = req.params.search

	var options = {
		protocol: 'https:',
		host: 'api.twitter.com',
		pathname: '/1.1/search/tweets.json'
	}
	var twitterUrl = url.format(options)

	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	})

	client.get(twitterUrl, {q: search}, function(error, tweets, resp){
		// response.write(resp.body.toString())
		// response.end()

		response.locals = {tweets: tweets['statuses'], search: search}
		response.render('search.ejs')
	})
})

app.listen(8080)
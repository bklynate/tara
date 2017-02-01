var apiKeys = require('./keys')
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: apiKeys.twitterKeys.consumer_key,
  consumer_secret: apiKeys.twitterKeys.consumer_secret,
  access_token_key: apiKeys.twitterKeys.access_token_key,
  access_token_secret: apiKeys.twitterKeys.access_token_secret
});

var command = process.argv[2];

switch(command) {
  case "my-tweets":
    client.get('statuses/user_timeline', {screen_name: 'freecodemine'}, function(error, tweets, response){
      if (!error) {
        tweets.forEach(function(tweet){
          console.log(tweet.text);
        })
      }
    });
    break;
  case "command":
    console.log('Hello World');
    break;
  case "command":
    console.log('Hello World');
    break;
  case "command":
    console.log('Hello World');
    break;
  default:
    console.log("Dobby taught me...")
    break
}

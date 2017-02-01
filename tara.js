var apiKeys = require('./keys')
var Twitter = require('twitter');
var spotify = require('spotify');

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
  case "spotify-this-song":
    var song = process.argv[3];
    if(!song) {
      console.log('"The Sign" by Ace of Base')
    } else {
      spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
        if ( err ) {
          console.log('Error occurred: ' + err);
          return;
        }
        data.tracks.items[0].artists.forEach(function(artist){
          console.log('Artist Name:', artist.name);
        })
        console.log('Album Name:', data.tracks.items[0].album.name);
        console.log('Song Name:', data.tracks.items[0].name);
        console.log('Preview Url:', data.tracks.items[0].preview_url);
      });
    }
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


// Do something with 'data'
// console.log("song name: ", data.tracks.items[0]) // Do something with 'data'
// console.log("preview link: ", data.tracks.items[0]) // Do something with 'data'
// console.log("album", data.tracks.items[0]) // Do something with 'data'

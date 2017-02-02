var apiKeys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');
var fs = require('fs');

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
      Spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
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
  case "movie-this":
    var movie = process.argv[3];
    if(!movie){
      movie = "Mr. Nobody"
      Request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&r=json", function (error, response, body) {
        if (!error && response.statusCode == 200) {
          bodyJSON = JSON.parse(body)
          console.log("Movie Title:", bodyJSON.Title)
          console.log("Movie Year:", bodyJSON.Year)
          console.log("IMDB Rating:", bodyJSON.imdbRating)
          console.log("Movie Origin:", bodyJSON.Country)
          console.log("Available Languages:", bodyJSON.Language)
          console.log("Movie Plot:", bodyJSON.Plot)
          console.log("Movie Actors:", bodyJSON.Actors)
          console.log("Metascore:", bodyJSON.Metascore)
        }
      });
    } else {
      Request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&r=json", function (error, response, body) {
        if (!error && response.statusCode == 200) {
          bodyJSON = JSON.parse(body)
          console.log("Movie Title:", bodyJSON.Title)
          console.log("Movie Year:", bodyJSON.Year)
          console.log("IMDB Rating:", bodyJSON.imdbRating)
          console.log("Movie Origin:", bodyJSON.Country)
          console.log("Available Languages:", bodyJSON.Language)
          console.log("Movie Plot:", bodyJSON.Plot)
          console.log("Movie Actors:", bodyJSON.Actors)
          console.log("Metascore:", bodyJSON.Metascore)
        }
      });
    }
    break;
  case "do-what-it-says":
    var filename = process.argv[3];
    fs.readFile(filename, function(error, data){
      if(error) {
        console.log(error);
      } else {
        console.log(data.toString().split(","));
      }
    });
    break;
  default:
    console.log("Tara knows...")
    break
}

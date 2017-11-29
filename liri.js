var action = process.argv[2];
var value = process.argv[3];
// var keys = require('./keys.js')
// var Twitter = require('twitter');
// var client = new Twitter(keys.twitterKeys);
var Twitter = require('twitter');

//twitter keys
var client = new Twitter ({
  consumer_key: 'NoDPRL6wrCqIP9rJNOIVan1p5',
  consumer_secret: '7TIIxJp1LytvRkTpoo8SgA7XuKvdtphy00mnvEa8lMkwBPovpP',
  access_token_key: '248815374-IxdoU6JO0UpAZHT4Ga0r4fc7IWJDErcDILY4anbr',
  access_token_secret: 'AHLxyquRo8NLluRiFaokvoKs0Q0g2BrzPwbjTW9s3Dw3p',
});
// console.log(client);
var params = {
    screen_name: '@cgrizzfry',
    count: 20
    };
var request = require('request');
var nodeArgs = process.argv;
var fs = require('fs');

var Spotify = require('node-spotify-api');

//spotify keys
var spotify = new Spotify({
  id: '64611d7bafff4054a5caae236874fdbc',
  secret: 'f33687f3d88e45e4a85acd8a9d568cb6'
});


switch (action){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify':
		spotifyThis(value);
		break;
	case 'omdb':
		omdbThis(value);
		break;
}

// my tweets function
function myTweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if(!error){
			console.log(' ');
            console.log('Last 20 Tweets:')
			for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
            }
		}
	});
}

function spotifyThis(value) {

    if (value == null) {
        value = 'Springsteen';
    }		
		var songName = "";

		for (var i = 3; i < nodeArgs.length; i++) {
		  if (i > 3 && i < nodeArgs.length) {
		    songName = songName + "+" + nodeArgs[i];
		  }
		  else {
		    songName += nodeArgs[i];
		  }
		}

		var queryUrl2 = 'https://api.spotify.com/v1/search?q=' + songName + '&type=track';

		console.log(queryUrl2);

		request(queryUrl2, function(error, response, body) {

		  if (!error && response.statusCode === 200) {

		    console.log("Song Title: " + JSON.parse(body));

		  }
		});
}


function omdbThis(value) {
    if (value == null) {
        value = 'Mr. Nobody';
    }		
		var movieName = "";

		for (var i = 3; i < nodeArgs.length; i++) {
		  if (i > 3 && i < nodeArgs.length) {
		    movieName = movieName + "+" + nodeArgs[i];
		  }
		  else {
		    movieName += nodeArgs[i];
		  }
		}

		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		console.log(queryUrl);

		request(queryUrl, function(error, response, body) {

		  if (!error && response.statusCode === 200) {


		    console.log("Title: " + JSON.parse(body).Year);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Country Produced: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		  }
		});
}

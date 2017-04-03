// var request = require('request');

var argv = process.argv;
var myCommand = process.argv[2];

switch (myCommand) {
  case "my-tweets":
      tweet();
      break;
  case "spotify-this-song":
      spotify();
      break;
  case "movie-this":
      movie();
      break;
  case "do-what-it-says":
      performAction();
      break;
}

/*====================================
=            TWITTER            =
====================================*/

function tweet() {
      var keysfile = require('./keys.js');
      var Twitter = require('twitter');
      var tweetsNumber = 0;
      var tweets = [];

      var client = new Twitter({
        consumer_key: '5aD0beC7ImObwzOY5lTwwJUJK',
        consumer_secret: 'xFN4tIkV6bYLgA56491UY2TacsKCE2v1B98VCWDnlpXvdVxwi9',
        access_token_key: '847566219167191040-mb8addRzxKThVMHgae71mZ3w5HTtig4',
        access_token_secret: 'CgrPSrTQ0EcxbzxvBJZ2xu3MG7ir3qMOPJSsBRWnZLF2f'
      });

      var params = {screen_name: 'nodejs'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets[0]);
            tweets.forEach(function(i) {
                tweetsNumber++;
                console.log('========== TWEET # '+tweetsNumber + '==========');
                console.log(i.text);
                    console.log('Created at: '+ tweets[0].user.created_at);
                    console.log("Re-tweet count: "+ tweets[0].retweet_count);
            })
        }
      });
}

/*=====  End of TWITTER Auth  ======*/




/*===============================
=            Spotify            =
===============================*/

function spotify() {
      var spotify = require('spotify');
      var songInput = process.argv[3];

      spotify.search({ type: 'track', query:songInput}, function(err, data) {
          if ( err ) {
              console.log('Error occurred: ' + err);
              return;
          }

          var results = data.tracks.items;
          var songNumber = 0;

          results.forEach(function(i) {
              songNumber++;
              console.log(" =====================================");
              console.log(" Matched song #" + songNumber+ " found");
              console.log("Type : " + i.type);
              console.log("Artist Name : " + i.album.artists[0].name);
              console.log("Popularity: " + i.popularity);
              console.log("Listen here: " + i.external_urls.spotify);
              console.log("Available markets: " + i.album.available_markets);
              console.log(" =====================================");

          });
      });
};
/*=====  End of Spotify  ======*/


/*=============================
=           Find Movie            =
=============================*/

function movie() {
    var request = require('request');
    var movieInput = process.argv[3];
    request("http://www.omdbapi.com/?t="+ movieInput+ "&y=&plot=short&r=json", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var obj = JSON.parse(body);
        // console.log(obj);
        console.log(" ===============MOVIE SEARCH RESULT======================");
        console.log("Title: " + obj.Title);
        console.log("Year the movie came out: " + obj.Year);
        console.log("Rated: " + obj.Rated);
        console.log("Country where the movie was produced: " + obj.Country);
        console.log("Language: " + obj.Language);
        console.log("Plot: " + obj.Plot);
        console.log("Actors: " + obj.Actors);
        console.log("The movie's rating is: " + obj.imdbRating);
        console.log(" ======================================================");
      }
    });
}

/*=====  End of Movie  ======*/


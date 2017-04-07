
var argv = process.argv;
var myCommand = process.argv[2];
var myInput = "";

for (var i=3; i< argv.length; i++) {
    myInput = myInput.concat(argv[i]+ " ");
}

switch (myCommand) {
  case "my-tweets":
      tweet();
      break;
  case "spotify-this-song":
      spotify(myInput);
      break;
  case "movie-this":
      movie(myInput);
      break;
  case "do-what-it-says":
      doIt();
      break;
}


function tweet(tweets) {
      var twitterKeys = require('./keys.js');
      var Twitter = require('twitter');
      var tweetsNumber = 0;
      var tweets = [];

      var client = new Twitter(twitterKeys.twitterKeys);
      console.log(twitterKeys.twitterKeys);


      // var client = new Twitter({
      //   consumer_key: '5aD0beC7ImObwzOY5lTwwJUJK',
      //   consumer_secret: 'xFN4tIkV6bYLgA56491UY2TacsKCE2v1B98VCWDnlpXvdVxwi9',
      //   access_token_key: '847566219167191040-mb8addRzxKThVMHgae71mZ3w5HTtig4',
      //   access_token_secret: 'CgrPSrTQ0EcxbzxvBJZ2xu3MG7ir3qMOPJSsBRWnZLF2f'
      // });

      var params = {screen_name: 'mia_greens'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
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

function spotify(songInput) {
      var spotify = require('spotify');
      songInput = myInput;

      spotify.search({ type: 'track', query:songInput}, function(err, data) {
          if ( err ) {
              console.log('Error occurred: ' + err);
              return;
          }

          var results = data.tracks.items;
          var songNumber = 0;

          results.forEach(function(i) {
              songNumber++;
              console.log(" ============= MATCHED song #"+ songNumber+ " ================");
              console.log("Type : " + i.type);
              console.log("Artist Name : " + i.album.artists[0].name);
              console.log("Popularity: " + i.popularity);
              console.log("Listen here: " + i.external_urls.spotify);
              console.log("Available markets: " + i.album.available_markets);
              console.log(" =============================================");

          });
      });
};

function movie(movie) {
        var request = require('request');
        movie = myInput;
        request("http://www.omdbapi.com/?t="+ movie+ "&y=&plot=short&r=json", function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var obj = JSON.parse(body);
            // console.log(obj);
            console.log(" ===============MOVIE SEARCH RESULT======================");
            console.log("Title: " + obj.Title);
            console.log("Year the movie came out: " + obj.Year);
            console.log("Rated: " + obj.imdbRating);
            console.log("Country where the movie was produced: " + obj.Country);
            console.log("Language: " + obj.Language);
            console.log("Plot: " + obj.Plot);
            console.log("Actors: " + obj.Actors);
            console.log("The movie's rating is: " + obj.imdbRating);
            console.log("Rotten Tomatoes Rating: " + obj.Rated);
            console.log("Rotten Tomatoes Url: https://www.rottentomatoes.com/m/" + obj.Title.split(" ").join("_"));
            console.log(" ======================================================");
          }
        });
}


function doIt () {
    var fs = require('fs');
    fs.readFile("random.txt", "utf8", function(err,data) {
        data = data.split(",");
        var commandLiri = data[0];
        var content = data[1];

        if (commandLiri == "my-tweets") {
            tweet();
        } else if ( commandLiri == "spotify-this-song") {
            myInput = data[1];
            spotify(myInput);
        } else if ( commandLiri == 'movie-this') {
            movie();
        }
    })
}




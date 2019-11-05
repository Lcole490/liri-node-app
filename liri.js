require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var fs = require ("fs");
var omdb = require('omdb');
var omdbKey = process.env.OMDB_API_KEY;
console.log(omdbKey)
var axios = require ("axios");

var bandsintown = require('bandsintown')("codingbootcamp");

const command = process.argv[2];
const secondCommand = process.argv.slice(3).join(" ");

var divider = "\n------------------------------------------------------------\n\n"




switch (command) {
    case ('concert-this'):
        concertThis();
    break;
    case ('spotify-this-song'):
        if(secondCommand){
            spotifyThisSong(secondCommand);
         } else{
            spotifyThisSong("The Sign");
         }
    break;
    case ('movie-this'):
        if(secondCommand){
            omdbThis(secondCommand);
        } else{
            omdbThis("Mr. Nobody");
        }
    break;
    case ('do-what-it-says'):
         doWhatItSays();
    break;
    default:
        console.log('Try again');
};



function spotifyThisSong(song){
    spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
        // if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
            var songInfo = data.tracks.items[i];
                      //artist
            console.log("Artist: " + songInfo.artists[0].name);
                      //song name
            console.log("Song: " + songInfo.name);
                      //spotify preview link
            console.log("Preview URL: " + songInfo.preview_url);
                      //album name
            console.log("Album: " + songInfo.album.name);
            console.log("-----------------------");

            var songData = [
              "Artist: " + songInfo.artists[0].name,
              "Song: " + songInfo.name,
              "Preview URL: " + songInfo.preview_url,
              "Album: " + songInfo.album.name
            ].join("\n\n");

            fs.appendFile("log.txt", songData + divider, function(err) {

              // If an error was experienced we will log it.
              if (err) {
                console.log(err);
                console.log("error occured")
              }
            
              // If no error is experienced, we'll log the phrase "Content Added" to our node console.
              else {
                console.log("Content Added!");
              }
            });

            } 
        // } else {
        // console.log('Error occurred.');
        // }
    });
    }



    function omdbThis(movie){
        var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
        console.log(movie)
        axios.get(omdbURL).then(function(response){
          // console.log(response)
          // if(!err){
            

            movieFiles =response.data;

            movieData =[
              
               "Title: " + movieFiles.Title,
               "Release Year: "+ movieFiles.Year,
               "IMdB Rating: " + movieFiles.imdbRating,
               "Rotten Tomatoes Rating: " + movieFiles.tomatoRating,
               "Country: " + movieFiles.Country,
               "Language: " + movieFiles.Language,
               "Plot: " + movieFiles.Plot,
               "Actors: " + movieFiles.Actors
            ].join("\n\n");

            fs.appendFile("log.txt", movieData + divider, function(err) {

              // If an error was experienced we will log it.
              if (err) {
                console.log(err);
                console.log("error occured")
              }
            
              // If no error is experienced, we'll log the phrase "Content Added" to our node console.
              else {
                console.log("Content Added!");
              }
      
             


            // var body = JSON.parse(body);
      
            // console.log("Title: " + body.Title);
            // console.log("Release Year: " + body.Year);
            // console.log("IMdB Rating: " + body.imdbRating);
            // console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            // console.log("Country: " + body.Country);
            // console.log("Language: " + body.Language);
            // console.log("Plot: " + body.Plot);
            // console.log("Actors: " + body.Actors);
            
          // } else{
            console.log('Error occurred.')
          // }
          if(movie === "Mr. Nobody"){
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

          }
          console.log(movieData);
        });
        });
    }



      function doWhatItSays(){
        fs.readFile('random.txt', "utf8", function(error, data){
          var txt = data.split(',');
      
          spotifyThisSong(txt[1]);
        });
      }

      function concertThis(){
        var location = ""
        var queryUrl = "https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp";
        //console.log(queryUrl);
        axios.get(queryUrl).then(function(response){
        // request(queryUrl, function(err, response, body){

          

        
            // If the request is successful
            // if (!err && response.statusCode === 200) {
                // Save parsed body in a new variable for easier use
                concertInfo = response.data;
                
                // console.log(secondCommand + " concert information:")
    
                for (i=0; i < 1; i++) {
                    
                    // location = concertInfo[i].venue.region
                     //handle Canadian venues
                    // if (location === "") {
                    //     location = concertInfo[i].venue.country
                    // }
                      concertStats = [
                        secondCommand + " Concert Information:",
                        "Venue: " + concertInfo[i].venue.name,
                        "Location: " + concertInfo[i].venue.city + ", " + location,
                        "Date: " + concertInfo[i].datetime
                        // "Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy")
                      ].join("\n\n");
                    // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
                    // console.log("Venue: " + concertInfo[i].venue.name)
                    // console.log("Location: " + concertInfo[i].venue.city + ", " + region);
                    // console.log("Date: " + dateFormat(concertInfo[i].datetime, "mm/dd/yyyy"))


                    fs.appendFile("log.txt", concertStats + divider, function(err) {

                      // If an error was experienced we will log it.
                      if (err) {
                        console.log(err);
                        console.log("error occured")
                      }
                    
                      // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                      else {
                        console.log("Content Added!");
                      }
                      console.log(concertStats);
                    });
                }
            
        })
    }
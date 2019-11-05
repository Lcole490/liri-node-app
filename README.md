# liri-node-app


The LIRI node app serves to demonstrate the power of node and how to incorporate it's abilities through the incorporation of APIs.




### Technologies Used: 

Node.js
Npm
APIs (to be listed)


### Purpose of App:

The purpose of this app is to be a CLI (Command Line Interface) version of iPhone's SIRI, which stands for Speech Interpretation and Recognition Interface. Thus, user interaction/ input will be key in the app's functionality. 

The user will be able to utilize this Language Interpretation and Recognition Interface (LIRI) to request information. Using established commands, the user would be able to search for information on the following categories:

Music
Movies
Concerts

When the user declares the search category, they then input what or who within that category for which they want LIRI to return information on.


### Input Ex

Each time the LIRI App is to be used, the user would first have to do an "npm -i" or "npm install" so that the dependencies needed for the app to function are loaded or accessible.

Then, to call the function the user will type "node liri.js" followed by one of the below commands or categories:

"spotify-this-song"
"movie-this"
"concert-this"

After this, the user will type what they would like to search for within the category:

Example:

node liri.js movie-this jaws

When executed, this will give the user stats like release year, ratings, plot synopsis, and cast


### Technologies/Dependencies Used

Programming:

Javascript          Node.js           NPM (Node Package Manager)            NPMJS.com

package.json



APIs:

Spotify - Platform for music and artist searches

OMDB - Platform for movie searches

BandsinTown- Platform for concert searches


### Future Scope

User Options

    -Possibly more options for users to search:
       * Sporting Events * Weather  * Travel * Restaurants 
    

    - User can get specific data only if they choose. So if they only want the actors in a movie they can input the following:
        node liri.js movie-this jaws actors



    
    
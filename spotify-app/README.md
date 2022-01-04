Node.js and React will be used to launch this project.

STEP ONE: OBTAIN CLIENT ID AND CLIENT SECRET

Go to https://developer.spotify.com/dashboard/applications and create an app. This is going to give you your client_id and client_secret needed to authenticate your account with spotify.

Go to edit settings and add 'http://localhost:8888/callback' under "Redirect URIs"

STEP TWO: CREATE AUTHENTICATION SERVER

In the terminal, type git clone https://github.com/spotify/web-api-auth-examples auth-server

Make sure to install the dependencies with npm install

Open the code in your text editor and navigate to authorization_code/app.js

Copy and paste your unique client_id and client_secret here to lines 16-17

Our redirect_uri is going to be 'http://localhost:8888/callback' on line 18

We will also need to add to our scope on line 49 to give Spotify access to information required to run the app.

We will add 'playlist-modify-public' and 'user-read-playback-state' to the scope.

The last thing we need to add is on line 107. Our redirect is going to be 'http://localhost:3000/#'

This will redirect us back to our react app once we have authenticated our spotify account.

STEP 3: LAUNCH REACT APP

In the terminal, type git clone https://github.com/Iamcrazymanny/spotify-api-project.git spotify-app to clone my project.

Make sure to install the dependencies with npm install

Navigate to the project in your terminal and type npm start

STEP 4: LAUNCH AUTHENTICATION SERVER

In a new terminal window, navigate to your auth-server in your working directory and type node authorization_code/app.js to launch the authentication server.

STEP 5: USING THE APP

In your browser, make sure to Login to Spotify first before using the apps features. Make sure a song is playing on your spotify account before pressing the "Check Now Playing" button.
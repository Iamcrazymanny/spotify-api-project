import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      myPlaylists: { playlists: '' }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


componentDidMount() {
    const requestOptions = {
        method: 'POST',
        header: { 
                   'Authorization':  'Bearer + token',
                   'Content-Type': 'application/json'
                   
         },

        body: {
        "name": "New Playlist"
        }
    };
    fetch('https://api.spotify.com/v1/users/user_id/playlists', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
}

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name,
              artist: response.item.album.artists[0].name,
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }


//Displays my 5 playlists. 

  getMyPlaylists(){
    spotifyApi.getUserPlaylists()
      .then((response) => {
         this.setState({
           myPlaylists: {
              playlists0: response.items[0].name,
              playlists1: response.items[1].name,
              playlists2: response.items[2].name,
              playlists3: response.items[3].name,
              playlists4: response.items[4].name,
        }
      });
    })
  }





  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          By: { this.state.nowPlaying.artist }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

        { this.state.loggedIn &&
          <button onClick={() => this.getMyPlaylists()}>
            My Playlists
            </button>
        }
        <div>
        My Playlists: <div> { this.state.myPlaylists.playlists0 } </div>
                     
                      <div> { this.state.myPlaylists.playlists1 } </div>

                      <div> { this.state.myPlaylists.playlists2 } </div>

                      <div> { this.state.myPlaylists.playlists3 } </div>

                      <div>  { this.state.myPlaylists.playlists4 } </div>
        </div>
      </div>
    );
  }
}

export default App;
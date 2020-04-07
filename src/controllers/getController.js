const fetch = require('node-fetch');
const axios = require('axios');
require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node');
const chalk = require('chalk');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_clientId,
    clientSecret: process.env.SPOTIFY_clientSecret,
    redirectUri: process.env.SPOTIFY_redirect
});
const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

const development = true

async function overview(req, res) {
    // let token = await getToken(req, res)
    // console.log(token.access_token)
        // spotifyApi.setAccessToken(token.access_token)
      
        res.render('./pages/overview', {
            title: 'Spotify Listening Party',
        });
}

function login(req, res) {
    const url = spotifyApi.createAuthorizeURL(scopes)
  res.redirect(url)  

}

async function party(req, res) {
        const result = await spotifyApi.getMe();
        req.session.userData = result
        res.render('./pages/party', {
            title: '',
            data: result.body
        });
}

async function getToken(req, res) {
    const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    if(development) {
      res.redirect('http://localhost:3000/party');
    } else {
      res.redirect('https://rtw-1920.herokuapp.com/party/');
    }
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
   
}

function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  
  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  let randomSearch = '';

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + '%';
      break;
    case 1:
      randomSearch = '%' + randomCharacter + '%';
      break;
  }

  return randomSearch;
}


async function chat(req, res) {
  const randomOffset = Math.floor(Math.random() * 10000);
  let results = await spotifyApi.searchTracks(getRandomSearch(), {limit: 50, offset: 50})
  .then(result => {
    return result
  })
  .catch(err => console.log(err))
  req.session.trackList = results.body.tracks.items
  console.log(results.body.tracks.items)
  res.render('./pages/chat', {
      title: '',
      data: req.session.userData
  });
}

module.exports = {
    overview,
    login,
    party,
    getToken,
    chat
}
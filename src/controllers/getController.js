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
const scopes = ["streaming", 'user-read-playback-state','user-modify-playback-state', 'user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']

const development = process.env.development

async function overview(req, res) {
  res.render('./pages/overview', {
    title: 'Spotify Listening Party',
  });
}

function login(req, res) {
  const url = spotifyApi.createAuthorizeURL(scopes)
  res.redirect(url)

}

async function party(req, res) {
  if (req.session.isLogedIn == null) {
    res.redirect('/login')
  }
  const result = await spotifyApi.getMe();
  req.session.userData = result
  res.render('./pages/party', {
    title: '',
    data: result.body
  });
}

async function getToken(req, res) {
  const {
    code
  } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const {
      access_token,
      refresh_token
    } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    if (development) {
      req.session.isLogedIn = true
      res.redirect('http://localhost:3000/party');
    } else {
      req.session.isLogedIn = true
      res.redirect('https://rtw-1920.herokuapp.com/party/');
    }
  } catch (err) {
    res.redirect('/#/error/invalid token');
  }

}

function getRandomSearch() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  let randomSearch = '';
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

async function searchApi(req,res){
  const randomOffset = Math.floor(Math.random() * 100);
  let results = await spotifyApi.searchTracks(getRandomSearch(), {
      limit: 20,
      offset: randomOffset
    })
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
    const uriList = results.body.tracks.items.map(function(o) { return o.uri; });
    res.json(uriList)
}

async function chat(req, res) {
  if (req.session.isLogedIn == null) {
    res.redirect('/login')
  }
 
  let token = spotifyApi._credentials.accessToken
  res.render('./pages/chat', {
    title: '',
    data: req.session.userData,
    token: token
  });
}

module.exports = {
  overview,
  login,
  party,
  getToken,
  chat,
  searchApi
}
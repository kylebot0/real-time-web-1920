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
        console.log(result.body);
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

    res.redirect('http://localhost:3000/party');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
   
}

module.exports = {
    overview,
    login,
    party,
    getToken
}
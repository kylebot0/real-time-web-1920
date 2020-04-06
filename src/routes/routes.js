const express = require('express');

const router = express.Router();
const get = {
    overview,
    login,
    party,
    getToken
} = require('../controllers/getController')

const post = {
} = require('../controllers/postController')

router.get('/', get.overview)
.get('/login', get.login)
.get('/spotify', get.getToken)
.get('/party', get.party)


// Make sure to export the router so it becomes available on imports
module.exports = router;
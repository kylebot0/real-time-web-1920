const express = require('express');

const router = express.Router();
const get = {
    overview,
} = require('../controllers/getController')

const post = {
} = require('../controllers/postController')

router.get('/', get.overview)


// Make sure to export the router so it becomes available on imports
module.exports = router;
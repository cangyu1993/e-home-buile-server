var express = require('express');
var router = express.Router();

const user = require('../controller/user')
const news = require('../controller/news')




router.use(user,news)

module.exports = router;

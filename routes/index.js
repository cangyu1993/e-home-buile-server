var express = require('express');
var router = express.Router();

const user = require('../controller/user')
const news = require('../controller/news')
const category = require('../controller/category')




router.use(user,news,category)

module.exports = router;

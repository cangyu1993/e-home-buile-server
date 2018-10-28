var express = require('express');
var router = express.Router();

const user = require('../controller/user')
const news = require('../controller/news')
const category = require('../controller/category')
const swiper = require('../controller/swiper')




router.use(user,news,category,swiper)

module.exports = router;

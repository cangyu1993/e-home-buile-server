var express = require('express');
var router = express.Router();

const user = require('../controller/user')
const news = require('../controller/news')
const category = require('../controller/category')
const swiper = require('../controller/swiper')
const common = require('../controller/common')
const commonChildren = require('../controller/commonChildren')




router.use(user,news,category,swiper,common,commonChildren)

module.exports = router;

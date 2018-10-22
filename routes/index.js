var express = require('express');
var router = express.Router();

const user = require('../controller/user')




router.use(user)

module.exports = router;

const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: String,
    idCard:{
        type:String,
        required:true,
        unique:true
    },
    username: String,
    email: String,
    password:{
        type:String,
        required:true,
    },
    dsc:String
}, {versionKey: false,timestamps:{createdAt: 'createdTime',updatedAt: 'updateTime'}});

module.exports = mongoose.model('user', user);
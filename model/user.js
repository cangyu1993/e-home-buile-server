const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: String,
    username:String,
    idCard:{
        type:String,
        required:true,
        unique:true
    },
    home:String,
    job:String,
    nation:String,
    wxNum:String,
    qqNum:String,
    sex:Number,
    study: String,
    jobTitle:String,
    money:Number,
    inTime:Number,
    payForTime:Number,
    identity:String,
    password:{
        type:String,
        required:true,
    },
    dsc:String
}, {versionKey: false,timestamps:{createdAt: 'createdTime',updatedAt: 'updateTime'}});

module.exports = mongoose.model('user', user);
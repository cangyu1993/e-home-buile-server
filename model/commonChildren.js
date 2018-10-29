const mongoose = require('mongoose')

const commonChildren = new mongoose.Schema({
    type:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'common'
    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    content:String
}, {
    versionKey: false,
    timestamps: {createdAt: 'createdTime', updatedAt: 'updateTime'}
})

module.exports = mongoose.model('commonChildren', commonChildren);
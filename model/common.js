const mongoose = require('mongoose')

const common = new mongoose.Schema({
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    content:String
}, {
    versionKey: false,
    timestamps: {createdAt: 'createdTime', updatedAt: 'updateTime'}
})

module.exports = mongoose.model('common', common);
const mongoose = require('mongoose')

const content = new mongoose.Schema({
    content: String,
    contentText: String,
}, {
}, {
    versionKey: false,
    timestamps: {createdAt: 'createdTime', updatedAt: 'updateTime'}
})

module.exports = mongoose.model('content', content);
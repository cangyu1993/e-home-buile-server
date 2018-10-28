const mongoose = require('mongoose')

const Swiper = new mongoose.Schema({
    title:String,
    img:String,
    type:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"news"
    },
    sort:Number
}, {
    versionKey: false,
    timestamps: {createdAt: 'createdTime', updatedAt: 'updateTime'}
})

module.exports = mongoose.model('Swiper', Swiper);
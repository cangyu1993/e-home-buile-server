const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const newsModel = require('../model/news');

router.post('/addnews', auth, async (req, res, next) => {
    try {
        let {title, content, contentText, img, author, type, lookNum} = req.body
        lookNum = parseInt(lookNum)
        let news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
            lookNum
        })
        res.json({
            code: 200,
            data:news,
            msg: "新闻创建成功"
        })

    } catch (err) {
        next(err)
    }
})

router.get('/news/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        let {page = 1, size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)

        let data = await newsModel.find({type: id})
            .skip((page - 1) * size)
            .limit(size)
            .sort({_id: -1})
            .populate({
                path: 'type',
                select: 'title'
            })
        res.json({
            code: 200,
            msg: "获取新闻成功",
            data: data,
            count: data.length
        })
    } catch (err) {
        next(err)
    }
})

router.get('/allnews', async (req, res, next) => {
    try {
        let {page = 1, size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)

        let data = await newsModel.find()
            .skip((page - 1) * size)
            .limit(size)
            .sort({_id: -1})
            .populate({
                path: 'type',
                select: 'title'
            })
        res.json({
            code: 200,
            msg: "获取全部新闻成功",
            data: data,
            count: data.length
        })
    } catch (err) {
        next(err)
    }
})

router.post('/changeNews/:id',auth,async (req, res, next) => {
    try {
        let {id} = req.params
        let {title, content, contentText, img, author, type, lookNum} = req.body
        let data = await newsModel.findOne({_id: id})
        let updata = await data.update({$set:{
                title,
                content,
                contentText,
                img,
                author,
                type,
                lookNum
            }})
        res.json({
            code: 200,
            data: updata,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/news/del/:id', auth, async (req, res, next) => {
    try {
        let {id} = req.params
        let data = await newsModel.remove({_id: id})
        res.json({
            code: 200,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router;

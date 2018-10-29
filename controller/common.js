const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const CommonModel = require('../model/common');

router.post('/addcommon', auth, async (req, res, next) => {
    try {
        let {author, content} = req.body
        if (author && content) {
            let data = await CommonModel.create({
                author,
                content,
            })
            res.json({
                code: 200,
                data: data,
                msg: "success"
            })
        } else {
            res.json({
                code: 401,
                msg: "不能发表空字段！"
            })
        }

    } catch (err) {
        next(err)
    }
})

router.get('/common', async (req, res, next) => {
    try {
        let {page = 1, size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)

        let data =await CommonModel.find()
            .skip((page - 1) * size)
            .limit(size)
            .sort({_id: -1})
            .populate({
                path:'author',
                select:'-password'
            })

        res.json({
            code: 200,
            data: data,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router;
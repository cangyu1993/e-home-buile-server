const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const SwiperModel = require('../model/Swiper');
const userModel = require('../model/user');
const jwt = require('jsonwebtoken')
router.post('/addswiper', auth, async (req, res, next) => {
    try {
        let {title, img, type, sort} = req.body
        sort = parseInt(sort)
        let data = await SwiperModel.create({
            title,
            img,
            type,
            sort
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

router.get('/swiper', async (req, res, next) => {
    try {
        let {page = 1, size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let datalength = await SwiperModel.find()

        let data = await SwiperModel.find()
            .skip((page - 1) * size)
            .limit(size)
            .sort({sort: -1})
        // .populate({
        //     path:'type',
        // })
        res.json({
            code: 200,
            data: data,
            msg: "success",
            count: datalength.length
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/swiper/:id', auth, async (req, res, next) => {
    try {
        let {id} = req.params
        let data = await SwiperModel.remove({_id: id})
        res.json({
            code: 200,
            msg: "success",
            data: data
        })

    } catch (err) {
        next(err)
    }
})

router.post('/changeSwripe/:id', (req, res, next) => {

    let token = req.headers.token || req.body.token || req.query.token

    let {id} = req.params
    let {title, img, type, sort} = req.body

    if (token) {
        const cert = '1024'
        jwt.verify(token, cert, function (err, decode) {
            if (err) {
                res.json({
                    code: 403,
                    msg: '登陆失效'
                })
                return
            }
            console.log(decode)

            userModel.findOne({_id: decode.userId}).then(user => {
                SwiperModel.findById(id).then(data => {
                    if (title && img && type && sort) {
                        data.update({
                            $set: {
                                title,
                                img,
                                type,
                                sort
                            }
                        }).then(updata=>{
                            res.json({
                                code: 200,
                                data: updata,
                                msg: "success"
                            })
                        })
                    } else {
                        res.json({
                            code: 401,
                            msg: "缺少必要字段，内容存在空字段！"
                        })
                    }

                })
            })
        })
    } else {
        res.json({
            code: 403,
            msg: '缺少token'
        })
    }
})


module.exports = router;
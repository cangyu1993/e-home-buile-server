const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const SwiperModel = require('../model/Swiper');


router.post('/addswiper',auth,async (req,res,next)=>{
    try {
        let {title,img,type,sort} = req.body
        sort = parseInt(sort)
        let data =await SwiperModel.create({
            title,
            img,
            type,
            sort
        })
        res.json({
            code:200,
            data:data,
            msg:"success"
        })
    }catch (err) {
        next(err)
    }
})

router.get('/swiper',async (req,res,next)=>{
    try {
        let {page = 1,size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let datalength = await SwiperModel.find()

        let data = await SwiperModel.find()
            .skip((page-1)*size)
            .limit(size)
            .sort({_id:-1})
        res.json({
            code:200,
            data:data,
            msg:"success",
            count:datalength.length
        })
    }catch (err) {
        next(err)
    }
})

router.delete('/swiper/:id',auth,async (req,res,next)=>{
           try {
               let {id} = req.params
               let data = await SwiperModel.remove({_id:id})
               res.json({
                   code:200,
                   msg:"success",
                   data:data
               })

           }catch (err) {
               next(err)
           }
})

router.post('/changeSwripe/:id',auth,async (req,res,next)=>{
    try {
        let {id} = req.params
        let {title,img,type,sort} = req.body
        let data =await SwiperModel.findById(id)
        let updata = await data.update({$set:{
                title,
                img,
                type,
                sort
            }})
        res.json({
            code:200,
            data:updata,
            msg:"success"
        })
    }catch (err) {
        next(err)
    }
})




module.exports = router;
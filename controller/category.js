const {Router} = require('express');

const router = Router();
const auth = require('./auth')
const categoryModel = require('../model/category');

router.post('/addcategory',auth,async (req,res,next)=>{
         try {
             let {title,icon} = req.body
             let data = await categoryModel.create({
                 title,
                 icon
             })
             res.json({
                 code:200,
                 msg:"success",
                 data:data
             })
         }catch (err) {
             next(err)
         }
})

router.get('/category',async (req,res,next)=>{
    try {
        let {page = 1,size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let data = await categoryModel.find()
            .skip((page-1)*size)
            .limit(size)
            .sort({_id:-1})
        if(data.length){
            res.json({
                code:200,
                data:data,
                msg:"success",
                count:data.length
            })
        }else {
            res.json({
                code:401,
                msg:"暂无更多数据"
            })
        }

    }catch (err) {
        next(err)
    }
})


module.exports = router;
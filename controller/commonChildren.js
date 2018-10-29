const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const ChildrenModel = require('../model/commonChildren');


router.post('/addchildren/:id',auth,async (req,res,next)=>{
    try {
        let {id} = req.params
        let {author,content} = req.body
        if (content){

            let type = id
            let data =await ChildrenModel.create({
                type,
                author,
                content
            })
            res.json({
                code:200,
                msg:"success",
                data:data
            })
        } else {
            res.json({
                code:401,
                msg:"评论不能为空"
            })
        }
    }catch (err) {
        next(err)
    }
})





router.get('/commonchildren/:id',auth,async (req,res,next)=>{
    try {
        let {id} = req.params
        let {page = 1,size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let data = await ChildrenModel.find({type:id})
            .skip((page-1)*size)
            .limit(size)
            .sort({_id:-1})
            .populate({
                path:'author',
                select:'-password'
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



module.exports = router;
const {Router} = require('express');

const router = Router();
const auth = require('./auth')

const newsModel = require('../model/news');

router.post('/addnews', auth, async (req, res, next) => {
    try {
        let {title, content, contentText, img, author, type, lookNum} = req.body

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
            code:200,
            msg:"新闻创建成功"
        })

    } catch (err) {
        next(err)
    }
})

router.get('/news',async (req,res,next)=>{
  try {
      let {page = 1, size = 10} = req.query
      page = parseInt(page)
      size =parseInt(size)

      let data = await newsModel.find()
          .skip((page-1)*size)
          .limit(size)
          .sort({_id:-1})

      res.json({
          code:200,
          msg:"获取新闻成功",
          data:data,
          count:data.length
      })
  }catch (err) {
      next(err)
  }
})

router.get('/news/:id',async (req,res,next)=>{
    try {
        let {id} = req.params
        console.log(id)
        let data = await newsModel.findOne({_id:id})
        res.json({
            code:200,
            data:data,
            msg:"success"
        })
    }catch (err) {
        next(err)
    }
})

router.delete('/news/del/:id', auth,async (req,res,next)=>{
    try {
         let {id} = req.params
         let data = await newsModel.remove({_id:id})
         res.json({
             code:200,
             msg:"success"
         })
    }catch (err) {
        next(err)
    }
})


module.exports = router;
const {Router} = require('express');

const router = Router();

const ContentModel = require('../model/content');

router.post('/addcontent',async (req, res) => {
    try {
        let {content,contentText} = req.body
        let data = await ContentModel.create({
            content,
            contentText
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

router.get('/allcontent',async (req, res) => {
      try {
        let data = await ContentModel.find()
        res.json({
            code: 200,
            data: data,
            msg: "success"
        })
      } catch (err) {
          next(err)
      }
});

module.exports = router
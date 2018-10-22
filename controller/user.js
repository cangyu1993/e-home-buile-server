const {Router} = require('express');

const router = Router();
const userModel = require('../model/user');


router.post('/adduser',async (req,res,next)=>{
    const {idCard,password,username,neckname,avatar,email,dsc} = req.body
              try {
                  if (idCard&&password.length>5){
                      let userData = await userModel.create({
                          avatar,
                          idCard,
                          username,
                          email,
                          password,
                          dsc
                      })
                      res.json({
                          code:200,
                          data:{
                              idCard:userData.idCard
                          },
                          msg:"注册成功！"
                      })
                  }else {
                      res.json({
                          code:400,
                          msg:"缺少必要参数"
                      })
                  }
              }catch (err) {
                  next(err)
              }
})

router.post('/login' ,async (req,res,next)=>{
    try {
        let {idCard,password} = req.body
        if (idCard&&password) {
            let user = await userModel.findOne({idCard})
            if (user){
                if (password ==user.password ) {
                    req.session.user = user
                    res.json({
                        code:200,
                        data:{
                            idCard:user.idCard
                        },
                        msg:"登陆成功"
                    })
                }else {
                    res.json({
                        code:401,
                        msg:"登陆账号或密码错误！"
                    })
                }
            } else {
                res.json({
                    code:401,
                    msg:'用户不存在'
                })
            }
        }else {
            res.json({
                code:401,
                msg:'缺少必要参数！'
            })
        }
    }catch (err) {
        next(err)
    }
})






module.exports = router;
const {Router} = require('express');

const router = Router();
const auth = require('./auth')
const userModel = require('../model/user');

const jwt = require('jsonwebtoken')

router.post('/adduser', async (req, res, next) => {
    const {
        avatar, username, idCard, home, job, nation, wxNum, qqNum, sex, study, jobTitle, money, inTime, payForTime, identity,
        password,
        dsc
    } = req.body
    try {
        if (idCard && password.length > 5) {
            let userData = await userModel.create({
                avatar,
                username,
                idCard,
                home,
                job,
                nation,
                wxNum,
                qqNum,
                sex,
                study,
                jobTitle,
                money,
                inTime,
                payForTime,
                identity,
                password,
                dsc
            })
            res.json({
                code: 200,
                msg: "注册成功！"
            })
        } else {
            res.json({
                code: 400,
                msg: "缺少必要参数"
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/changeAdminMsg/:id',auth,async (req,res,next)=>{
    try {
        let {id} = req.params
        const {
            avatar, username, idCard, home, job, nation, wxNum, qqNum, sex, study, jobTitle, money, inTime, payForTime, identity,
            password,
            dsc
        } = req.body
        if(idCard&&password.length>5){
            let data = await userModel.findById(id)
            let updata = await data.update({$set:{
                    avatar,
                    username,
                    idCard,
                    home,
                    job,
                    nation,
                    wxNum,
                    qqNum,
                    sex,
                    study,
                    jobTitle,
                    money,
                    inTime,
                    payForTime,
                    identity,
                    password,
                    dsc
                }})
            res.json({
                code:200,
                msg:'success',
            })
        }else {
          res.json({
              code:401,
              msg:'缺少必要信息'
          })
        }

    }catch (err) {
        next(err)
    }
})


router.post('/login', async (req, res, next) => {
    try {
        let {idCard, password} = req.body
        if (idCard && password) {
            let user = await userModel.findOne({idCard})
            if (user) {
                if (password === user.password) {
                    const cert = '1024'
                    const token = jwt.sign({userId: user._id}, cert, {expiresIn: 60 * 60 * 12})
                    req.session.user = user
                    res.json({
                        code: 200,
                        data: {
                            idCard: user.idCard,
                            avatar: user.avatar,
                            username: user.username,
                            id: user._id
                        },
                        token: token,
                        msg: "登陆成功"
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: "登陆账号或密码错误！"
                    })
                }
            } else {
                res.json({
                    code: 401,
                    msg: '用户不存在'
                })
            }
        } else {
            res.json({
                code: 401,
                msg: '缺少必要参数！'
            })
        }
    } catch (err) {
        next(err)
    }
})

router.get('/getuser', auth, async (req, res, next) => {
    try {
        let {page = 1, size = 10} = req.query
        page = parseInt(page)
        size = parseInt(size)
        let userlength = await userModel.find({}, {password: 0})
        let user = await userModel.find({}, {password: 0})
            .skip((page - 1) * size)
            .limit(size)
            .sort({_id: -1})
        res.json({
            code: 200,
            data: user,
            count: userlength.length,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

router.get('/getuser/:id', async (req, res, next) => {
  try {
      let {id} = req.params
      let data = await userModel.find({_id: id}, {password: 0})
      res.json({
          code: 200,
          data: data,
          msg: 'success'
      })
  }catch (err) {
      next(err)
  }
})

router.get('/getAllUser', async (req, res, next) => {
    try {
        let data = await userModel.find({}, {password: 0})
        res.json({
            code: 200,
            data: data,
            msg: "success",
            count: data.length
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/deleteAdmin/:id', auth, async (req, res, next) => {
    try {
        let {id} = req.params
        if(id ='5bd9338b7af29b4e1891c006'){
            res.json({
                code:401,
                msg:'无法删除此管理员'
            })
        }else {
            let data = await userModel.remove({_id:id})
            res.json({
                code:200,
                data:data,
                msg:'success'
            })
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;
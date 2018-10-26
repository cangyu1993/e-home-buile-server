const {Router} = require('express');

const router = Router();
const auth = require('./auth')
const userModel = require('../model/user');


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

router.post('/login', async (req, res, next) => {
    try {
        let {idCard, password} = req.body
        if (idCard && password) {
            let user = await userModel.findOne({idCard})
            if (user) {
                if (password === user.password) {
                    req.session.user = user
                    res.json({
                        code: 200,
                        data: {
                            idCard: user.idCard,
                            avatar: user.avatar,
                            username: user.username,
                        },
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
        let userlength = await userModel.find({},{password: 0})
        console.log(page,size)
        let user = await userModel.find({},{password: 0})
            .skip((page-1)*size)
            .limit(size)
            .sort({_id:-1})
        res.json({
            code: 200,
            data: user,
            count:userlength.length,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router;
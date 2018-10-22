module.exports = function (req,res,next) {
    if (req.session&&req.session.user) {
        next()
    }else {
        res.json({
            code:403,
            msg:"登陆状态失效！请重新登陆！"
        })
    }
}
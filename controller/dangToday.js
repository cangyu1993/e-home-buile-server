const {Router} = require('express');

const router = Router();
const getUrl = require('./Today')

router.get('/todayhistory', async (req, res, next) => {
    try {
        let {month, day} = req.query
        month = parseInt(month)
        day = parseInt(day)
        if (month >= 10) {
            month = '' + month
        } else {
            month = '0' + month
        }
        if (day >= 10) {
            day = '' + day
        } else {
            day = '0' + day
        }
        let url = await getUrl(month, day)
        res.json({
            code: 200,
            data: url,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }

})


module.exports = router;
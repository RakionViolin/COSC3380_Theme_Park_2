const express = require('express')
var router = express.Router();

/* GET rainout report page */
router.get('/', (req, res, next) => {
    res.render('report_rainout', {})
});

module.exports = router;
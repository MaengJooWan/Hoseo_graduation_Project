var express = require('express');

const { isLoggedIn } = require('../Login/middlewares');

const router = express.Router();

// router.post('/search', function (req, res) {

// });

//Main
router.get('/', isLoggedIn, function (req,res){
    res.render('SMART_MANAGEMENT/Inventory_location.ejs', {
        title : 'Smart ERP - 제품위치',
        user: req.user,
    });
});

module.exports = router;

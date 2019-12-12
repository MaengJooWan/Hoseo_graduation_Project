const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//정보
router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile', {title : '정보',user : req.user});
});

//회원가입
router.get('/join', isNotLoggedIn, (req,res) =>{
    res.render('join',{
        title : '회원가입',
        user: req.user,
        joinError: req.flash('joinError'),
    });
});

//메인
router.get('/', (req,res,next) =>{
    res.render('main', {
        title : 'SmartERP',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});


module.exports = router;
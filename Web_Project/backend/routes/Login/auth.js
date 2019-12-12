const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../../models');

const router = express.Router();

//회원가입
router.post('/join', isNotLoggedIn, async (req,res,next) => {
    const { email, name, password} = req.body;
    try{
        const exUser = await User.find({where : {email}});
        if (exUser){
            req.flash('joinError','이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            name,
            password : hash,
        });
        return res.redirect('/');
    } catch (error){
        console.log(error);
        return next(error);
    }
});

//로그인
router.post('/login', isNotLoggedIn, async (req,res,next) => {
    passport.authenticate('local', (authError, user, info)=>{
        if (authError){
            console.error(authError);
            return next(authError);
        }

        if(!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) =>{
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

//로그아웃
router.get('/logout', isLoggedIn, (req,res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
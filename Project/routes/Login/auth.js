const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../../models');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user : 'kkag2506@gmail.com',
    pass: 'hoseo3022'
  }
});

const router = express.Router();

//회원가입
router.post('/join', isNotLoggedIn, async (req,res,next) => {
    console.log("회원가입 라우터 진입");
    //console.log(req.body);
    const { Email, Name, PW, HP, EmployeeNum, Department} = req.body;

    try{
      const hash = await bcrypt.hash(PW,12);
      //console.log(hash);
      await User.create({
          Email,
          Name,
          PW : hash,
          HP,
          EmployeeNum,
          Authority : 2,
          Department,
      });
      return res.redirect('/');
  } catch (error){
      return next(error);
  }


});

//ID 중복 확인
router.post('/idoverlap', isNotLoggedIn, async (req,res,next)=> {
    console.log('ID 중복확인 라우터 진입.');
    const { Email } = req.body;
    try {
      const exUser = await User.findOne({where : {Email}});
      if (exUser){
        res.send({ok:'이미 가입된 이메일입니다.'});
        res.end();
      } else {
        res.send({ok:'사용 가능한 이메일입니다.'});
        res.end();
      }
    } catch (error){
      console.log(error);
      return next(error);
    }
});

//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log('로그인 라우터 진입.');
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        req.flash('loginError', info.message);
        return res.redirect('/');
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

//id 찾기
router.post('/idsearch', isNotLoggedIn, async (req,res,next) =>{
  console.log("id 찾기 라우터 진입");

  const {Name, EmployeeNum} = req.body;

  console.log(Name);
  console.log(EmployeeNum);

  try{
    const result = await User.findOne({where: [{Name}, {EmployeeNum}]});

    if(result){
      console.log(result.Email);
      res.send({ok:Name + '님의 계정은 ' + result.Email + ' 입니다.', value: 0});
      res.end();
    } else {
      res.send({ok:'존재하지 않는 사용자이거나 이름 또는 사원번호를 다시 입력해주세요.', value: 1});
      res.end();
    }
    
  } catch(error){
    console.log(error);
    return next(error);
  }

});


//pw 찾기
router.post('/pwsearch', isNotLoggedIn, async (req,res,next) =>{
  console.log('pw 찾기 라우터 진입');

  const {Email, Name} = req.body;

  console.log(Email);
  console.log(Name);

  try{
    const result_value = await User.findOne({where: [{Email}, {Name}]});
    
    if(result_value){
      console.log('if문 진입');
      var value = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var pw_result = '';
      const no_result = result_value.id;


      //PW 랜덤 문자 생성
      for(var i=0; i<15; i++){
        var rnum = Math.floor(Math.random() * value.length);
        pw_result += value.substring(rnum,rnum+1);
      }

      console.log(pw_result);

      //랜덤으로 생성된 PW hash로 생성
      const hash = await bcrypt.hash(pw_result,12);

      //pw 업데이트
      const pw_update = await User.update({PW: hash}, {where: { id: no_result }});

      if(pw_update){
        var mailOption = {
          from : Email,
          to : 'kkag2506@gmail.com',
          subject : Name + '회원님의 Smart_ERP 계정 PW입니다.',
          text : Name + '회원님의' + Email + '계정 PW는' + pw_result + '입니다.'
        }

        transporter.sendMail(mailOption, function(error,info){
          if(error){
            console.log(error);
          }else{
            res.send({ok: Name + '님의 이메일 계정 ' + Email + '으로 패스워드를 전송하였습니다.', value: 0});
            res.end();
          }
        })
      }
    } else {
      res.send({ok:'존재하지 않는 이메일이거나 이름 또는 이메일을 다시 입력해주세요.', value: 1});
      res.end();
    }
  } catch(error){
    console.log(error);
    return next(error);
  }

});


//PW 체크
router.post('/userpwcheck', isLoggedIn,  async (req,res)=>{
    const pw = req.body.pw;


    console.log('PW 체크 접근');

    console.log(pw);
    console.log(req.user.Email);

  try{
    const exUser = await User.findOne({ where: { Email: req.user.Email } });
    const result = await bcrypt.compare(pw, exUser.PW);

    if(result){
      res.send({ok : 0});
    }else{
      res.send({ok : 1});
    }
  }catch(error){
    console.log(error);
    next(error);
  }

});

//로그아웃
router.get('/logout', isLoggedIn, (req,res) => {
    console.log('로그아웃 라우터 진입.');
    req.logout();
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./Login/middlewares');
const { Stationery, Training_result, Sales, Release, User, Board, Sequelize: {fn}, Sequelize: {col} } = require('../models');

const router = express.Router();

var today = new Date();
var yyyy = today.getFullYear(); 
var mm = today.getMonth() + 1;
var dd= today.getDate();

//월 날짜 포맷팅
if(mm <=9){
    mm = '0' + mm;
}

//일 날짜 포맷팅
if(dd <= 9){
    dd = '0' + dd;
}

var date_result = yyyy + "-" + mm + "-" + dd;

//ID 찾기
router.get('/idsearch', isNotLoggedIn, (req,res) =>{
    res.render('ID_Search.ejs',{
        title : 'Smart ERP - ID 찾기',
        user: req.user,
        loginErrorsize: 0,
    });
});

//PW 찾기
router.get('/pwsearch', isNotLoggedIn, (req,res) =>{
    res.render('PW_Search.ejs',{
        title : 'Smart ERP - PW 찾기',
        user: req.user,
        loginErrorsize: 0,
    });
});

//회원가입
router.get('/join', isNotLoggedIn, (req,res) =>{
    res.render('Join.ejs',{
        title : 'Smart ERP - 회원가입',
        user: req.user,
        loginErrorsize: 0,
    });
});

//ID찾기 결과
router.get('/id_search_result', isNotLoggedIn, (req,res) =>{
    res.render('ID_Search_Result.ejs',{
        title : 'Smart ERP - ID 찾기 결과',
        user: req.user,
        loginErrorsize: 0,
    });
});


//회원정보수정
router.get('/userchange', isLoggedIn, (req,res) =>{
    res.render('User_Change.ejs',{
        title : 'Smart ERP - 회원정보 수정',
        user: req.user,
        loginErrorsize: 0,
    });
});

//메인
router.get('/', (req,res,next) =>{
    var loginError = req.flash('loginError');
    var loginErrorSize = loginError.length;

    console.log(date_result);

    // //트레이닝 결과 값 가지고 오기
    var training = function() {
    return Training_result.findAll({
        include: {
            model: Stationery,
            attributes: ['id','Name','Link'],
            required: false
        },
            where: {Today: date_result},
            order: [['Count','DESC']],
        })
            .then((training) => {
                return training;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }


    //공지사항
    var notice = function(){
    return Board.findAll({
        include: {
            model: User,
            attributes: ['id','Name'],
            required: false
        },
            order: [['id','DESC']],
        })
            .then((notice) => {
                return notice;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }

    
    //입고값
    var input = function(){
    return Sales.findAll({
        attributes: ['Date','Stationery_NO', [fn('sum', col('sales.Count')), 'Count']],
        include: {
            model: Stationery,
            attributes: ['id','Name'],
            required: false
        },
            where: {Date: date_result},
            group: ['Stationery_NO'],
        })
            .then((input)=>{
                return input;
        })
            .catch((error) => {
                console.log(error);
                next(error);
        });
    }

    //출고값
    var output = function(){
    return Release.findAll({
        attributes: ['Date','Stationery_NO', [fn('sum', col('Release.Count')), 'Count']],
        include: {
            model: Stationery,
            attributes: ['id','Name'],
            required: false
        },
            where: {Date: date_result},
            group: ['Stationery_NO'],
        })
            .then((output)=>{
                return output;
        })
            .catch((error) => {
                console.log(error);
                next(error);
        });
    }

    //물품 데이터
    var products = function(){
    return Stationery.findAll({
        attributes: ['id','Name', 'Link'],
        })
            .then((products)=>{
                return products;
        })
            .catch((error) => {
                console.log(error);
                next(error);
        });
    }
    

    //결과값 EJS에 전송
    training().then(function(t_result){
        notice().then(function(n_result){
            input().then(function(i_result){
                output().then(function(o_result){
                    products().then(function(p_result){
                        res.render('Main_index.ejs', {
                            title : 'Smart ERP - Main',
                            user: req.user,
                            loginError: loginError,
                            loginErrorsize: loginErrorSize,
                            trainingValue: t_result,
                            inputValue: i_result,
                            outputValue: o_result,
                            noticeValue: n_result,
                            productsValue: p_result,
                        });
                        console.log(t_result);
                    });
                });
            });
        });
    });
});


module.exports = router;
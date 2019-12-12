var express = require('express');
const router = express.Router();
const {Stationery, Sales, Sequelize: {Op}} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');

var value = 0;
var recheck = 0;
var StartDay;
var EndDay;
var Search;

//검색
router.post('/search', isLoggedIn, function (req, res) {
    recheck = 1;
    value = 1;
    console.log('입고 검색 접근');

    StartDay = req.body.StartDay;
    EndDay = req.body.EndDay;
    Search = req.body.Search;

    console.log("시작 날짜 : " + StartDay);
    console.log("끝 날짜 : " + EndDay);
    console.log("검색 데이터 : " + Search);
});

//입고 메인
router.get('/', isLoggedIn , function (req,res){
    console.log("입고 메인 접근");
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

    if(recheck == 0){
        var result = function(){
        return Sales.findAll({
            include: {
                model: Stationery,
                attributes: ['id','Name'],
                required: false
            },
                where: {Date: date_result},
                order: [['Date','ASC']],
            })
                .then((result) => {
                    return result;
            })
                .catch((error) =>{
                    console.log(error);
                    next(error);
            });
        }
    }else{
        var result = function(){
        return Sales.findAll({
            where: {Date: {[Op.between]: [StartDay, EndDay]}},
            order: [['Date','ASC']],
            include: [{
                model: Stationery,
                attributes: ['id','Name'],
                where: {Name: {[Op.like]: "%" + Search + "%"}}}]
            })
                .then((result) => {
                    return result;
            })
                .catch((error) =>{
                    console.log(error);
                    next(error);
            });
        }
    }

    recheck = 0;

    result().then(function(result_value){
        res.render('../views/ITEM_ADMINSTRATION/Recive_management.ejs', {
            title : 'Smart ERP - 입고관리',
            user: req.user,
            rv: result_value,
            value: value,
        });
        value = 0;
    });
});


//입고등록 창 띄우기
router.get('/recvie_add_window', isLoggedIn, function (req,res){
    res.render('ITEM_ADMINSTRATION/Recvie_Add.ejs', {
        title : 'Smart ERP - 입고 등록',
        user: req.user,
        rv: 0,
    });
});


//승인창 띄우기
router.get('/recvie_apply_window', isLoggedIn, function (req, res){
    
    var result = function(){
    return Sales.findAll({
        include: {
            model: Stationery,
            attributes: ['id','Name'],
            required: false
        },
            where: {Approval : 0},
            order: [['id','ASC']],
        })
            .then((result) => {
                return result;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }
    
    
    result().then(function(result_value){
        res.render('ITEM_ADMINSTRATION/Recive_Apply.ejs', {
            title : 'Smart ERP - 입고 승인',
            user: req.user,
            rv: result_value,
        });
    });
    

});



module.exports = router;

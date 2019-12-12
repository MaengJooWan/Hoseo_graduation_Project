var express = require('express');

const {Stationery, Release, Sequelize: {Op}} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');

const router = express.Router();

var recheck = 0;
var StartDay;
var EndDay;
var Search;
var value = 0;

//검색
router.post('/search', isLoggedIn, function (req, res) {
    recheck = 1;
    value = 1;
    console.log("출고 검색 접근");

    StartDay = req.body.StartDay;
    EndDay = req.body.EndDay;
    Search = req.body.Search;
    
});


//출고등록 창
router.get('/forward_add_window',isLoggedIn, function (req,res){
    res.render('ITEM_ADMINSTRATION/Forward_Add.ejs', {
        title : 'Smart ERP - 출고 등록',
        user: req.user,
        rv: 0,
    });
});


//승인등록 창
router.get('/forward_apply_window',isLoggedIn, function (req, res){
    var result = function(){
    return Release.findAll({
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
        res.render('ITEM_ADMINSTRATION/Forward_Apply.ejs', {
            title : 'Smart ERP - 출고 승인',
            user: req.user,
            rv: result_value,
        });
    });
});

//메인
router.get('/',isLoggedIn, function(req,res){
    //출고목록 가지고 오기
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
    
    console.log("출고 메인 접근");

    if(recheck==0){
        var result = function(){
        return Release.findAll({
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
        return Release.findAll({
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
        res.render('ITEM_ADMINSTRATION/Forward_management.ejs', {
            title : 'Smart ERP - 출고 관리',
            user: req.user,
            rv: result_value,
            value: value,
        });
        value = 0;
    });
})


module.exports = router;
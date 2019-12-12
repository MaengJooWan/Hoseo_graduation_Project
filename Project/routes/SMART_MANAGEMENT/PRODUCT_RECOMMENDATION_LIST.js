var express = require('express');
const {Stationery, Training_result, Sequelize: {Op}} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');
const router = express.Router();

var recheck = 0;
var StartDay;
var EndDay;
var value = 0;


//검색
router.post('/search', function (req, res) {
    recheck = 1;
    value = 1;

    StartDay = req.body.StartDay;
    EndDay = req.body.EndDay;
});


//Main
router.get('/', isLoggedIn, function(req,res){
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
    if(recheck==0){
        var result = function(){
        return Training_result.findAll({
            include: [{
                model: Stationery,
                attributes: ['id','Name'],
                required: false
            }],
                where: {Today: date_result},
                order: [['Today','ASC']],
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
        return Training_result.findAll({
            include: [{
                model: Stationery,
                attributes: ['id','Name'],
                required: false
            }],
                where: {Today: {[Op.between]: [StartDay, EndDay]}},
                order: [['Today','ASC']],
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
        res.render('SMART_MANAGEMENT/Product_Recommendation_List.ejs', {
            title : 'Smart ERP - 추천목록',
            user: req.user,
            rv: result_value,
            value: value,
        });
        value = 0;
    });
});

//차트 표시
router.post('/chart', function(req, res){

    console.log("POST chart 접근");
    
    
    StartDay = req.body.StartDay;
    EndDay = req.body.EndDay;

    var result1 = function(){
    return Stationery.findAll({
            attributes: ['id','Name'],
        })
            .then((result) => {
                return result;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }

    var result = function(){
    return Training_result.findAll({
        include: [{
            model: Stationery,
            attributes: ['id','Name'],
            required: false
        }],
            where: {Today: {[Op.between]: [StartDay, EndDay]}},
            order: [['Today','ASC']],
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
        result1().then(function(result_value1){
            res.send({value1 : result_value, value2 : result_value1});
        });
    });
});

module.exports = router;

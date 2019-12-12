var express = require('express');
const { isLoggedIn } = require('../Login/middlewares');
const router = express.Router();
const {Stationery, Faulty, Sequelize: {Op}, User} = require('../../models');

var value = 0;
var recheck = 0;
var StartDay;
var EndDay;

//검색
router.post('/search', function (req, res) {
    recheck = 1;
    value = 1;
    StartDay = req.body.StartDay;
    EndDay = req.body.EndDay;
});


//메인
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
        return Faulty.findAll({
            include: [{
                model: Stationery,
                attributes: ['id','Name'],
                required: false
            },{
                model: User,
                attributes: ['id','Name'],
                required: false
            }],
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
        return Faulty.findAll({
            include: [{
                model: Stationery,
                attributes: ['id','Name'],
                required: false
            },{
                model: User,
                attributes: ['id','Name'],
                required: false
            }],
                where: {Date: {[Op.between]: [StartDay, EndDay]}},
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
    }

    recheck = 0;

    
    result().then(function(result_value){
        res.render('CHECK_MANAGEMENT/Inventory_inquiry.ejs', {
            title : 'Smart ERP - 재고량조회',
            user: req.user,
            rv: result_value,
            value: value,
        });
        value = 0;
    });

});


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
    return Faulty.findAll({
        include: [{
            model: Stationery,
            attributes: ['id','Name'],
            required: false
        },{
            model: User,
            attributes: ['id','Name'],
            required: false
        }],
            where: {Date: {[Op.between]: [StartDay, EndDay]}},
            group: ['Date'],
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

    result().then(function(result_value){
        result1().then(function(result_value1){
            res.send({value1 : result_value, value2 : result_value1});
        });
    });
});

module.exports = router;

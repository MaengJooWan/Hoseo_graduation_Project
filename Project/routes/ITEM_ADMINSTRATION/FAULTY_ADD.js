var express = require('express');
const router = express.Router();
const {Stationery, Faulty, Sequelize: {Op}} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');

var Search;
var select = 0;


//불량등록
router.post('/faulty_add', isLoggedIn, async function(req,res, next) {
    console.log("불량등록 접근");
    const {Stationery_NO, date, Count} = req.body;
    const User_NO = req.user.id;
    const Weekday = new Date(date).getDay();

    console.log(Weekday);

    try{
        await Faulty.create({
            Date: date,
            User_NO,
            Count,
            Stationery_NO,
            Weekday,
        });
        res.send({ok : 1});
    } catch (error){
        res.send({ok : 0});
        return next(error);
    }
});

//검색
router.post('/faulty_search', isLoggedIn, function(req,res){
    Search = req.body.Search;
    select = 1;
    //Insert문
    console.log("검색 접근");
    console.log(Search);

    res.end();
});

//검색 결과 Return
router.get('/', isLoggedIn, function(req,res){
    console.log("Main 접근");

    var result = function(){
    return Stationery.findAll({
        where: {Name: {[Op.like]: "%" + Search + "%"}},
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
        console.log(select);
        res.render('ITEM_ADMINSTRATION/faulty_Add.ejs', {
            title : 'Smart ERP - 불량 등록',
            user: req.user,
            rv: result_value,
            select: select,
        });
        select = 0;
    });
})

module.exports = router;
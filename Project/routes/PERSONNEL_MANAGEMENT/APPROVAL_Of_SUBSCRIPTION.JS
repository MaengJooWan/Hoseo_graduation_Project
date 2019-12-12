var express = require('express');
const { isLoggedIn } = require('../Login/middlewares');
const {User, Sequelize: {Op}} = require('../../models');

const router = express.Router();

//승인
router.post('/Apply', async (req, res) => {
    const data_result = req.body.col1;

    try{
        await User.update({
            Authority: 1,
        },{
            where: {id: data_result},
        });
        res.send({ok : 1});
    } catch(error){
        res.send({ok : 0});
        return next(error);
    }

    

    res.end();
});

//검색
router.post('/search', function (req, res) {
    var result = function(){
    return User.findAll({
            where: {Authority : 2},
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
        res.send({ok : result_value});
        res.end();
    });
});


//Main
router.get('/',isLoggedIn,function(req,res){
    var result = function(){
    return User.findAll({
            where: {Authority : 2},
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
        res.render('PERSONNEL_MANAGEMENT/Approval_Of_Subscription.ejs', {
            title : 'Smart ERP - 가입승인',
            user: req.user,
            rv: result_value,
        });
    });
});
module.exports = router;
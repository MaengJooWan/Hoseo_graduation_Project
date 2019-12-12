var express = require('express');
const { isLoggedIn } = require('../Login/middlewares');
const { User } = require('../../models');
const router = express.Router();


//메인
router.get('/', isLoggedIn, function (req,res){

    var user_result = function(){
    return User.findAll({
        order: [['Department','DESC']],
        })
            .then((notice) => {
                return notice;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }


    user_result().then(function(result_value){
        res.render('PERSONNEL_MANAGEMENT/Personnel_information.ejs', {
            title : 'Smart ERP - 인사정보',
            user: req.user,
            user_value : result_value,
        });
    });
});

module.exports = router;

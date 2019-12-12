const express = require('express');
const { isLoggedIn } = require('./Login/middlewares');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();


//메인
router.get('/', isLoggedIn, (req,res,next) => {
    var user_data = function() {
    return User.findAll({
            where: {id: req.user.id},
        })
            .then((training) => {
                return training;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }

    //데이터 전송
    user_data().then(function (result){
        res.render('User_Chage_View.ejs',{
            title : 'Smart ERP - 회원정보 수정',
            user: req.user,
            rv: result,
        });
    });
});


//데이터 업데이트
router.post('/update', isLoggedIn, async (req,res,next)=>{
    const {PW,Name,EmployeeNum,HP,department} = req.body;


    console.log(PW);
    console.log(Name);
    console.log(req.user.id);
    console.log(EmployeeNum);
    console.log(HP);
    console.log(department);

    try{
        const hash = await bcrypt.hash(PW,12);
        console.log(hash);
        await User.update({
            Name: Name,
            PW: hash,
            HP: HP,
            EmployeeNum: EmployeeNum,
            Department: department,
        },{
            where: {id: req.user.id},
        });
        res.send({ok : 0});
    } catch(error){
        res.send({ok : 1});
        return next(error);
    }
});


module.exports = router;
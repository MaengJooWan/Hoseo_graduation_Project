var express = require('express');

const { Board } = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');
const router = express.Router();

// 글쓰기
router.post('/write', isLoggedIn,  async function (req, res) {
    console.log("글쓰기 접근");

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

    const {Title, Content} = req.body;
    const User_NO = req.user.id;

    try{
        await Board.create({
            Title,
            Content,
            User_NO,
            Approval : 2,
            Date: date_result,
        });
        res.send({ok : 1});
    } catch (error){
        res.send({ok : 0});
        return next(error);
    }
});

module.exports = router;
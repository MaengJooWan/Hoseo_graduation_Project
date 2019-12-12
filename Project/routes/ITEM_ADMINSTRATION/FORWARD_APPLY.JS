var express = require('express');
const router = express.Router();
const {Stationery, Release} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');


//출고 데이터 검색
router.post('/forward_apply_search', isLoggedIn, function(req,res){

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
        res.send({ok : result_value});
        res.end();
    });
    
});


//값 업데이트
router.post('/forward_apply_update', isLoggedIn, async (req,res) =>{
    const data_result = req.body.col1;

    console.log("업데이트 접근");
    
    try{
        await Release.update({
            Approval: 1,
        },{
            where: {id: data_result},
        });
        res.send({ok : 1});
    } catch(error){
        res.send({ok : 0});
        return next(error);
    }
});

module.exports = router;
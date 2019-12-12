var express = require('express');
const router = express.Router();
const {Stationery, Sales} = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');


//입고 데이터 검색
router.post('/recvie_apply_search', isLoggedIn, function(req,res){
    //const value = req.body;

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
        res.send({ok : result_value});
        res.end();
    });
    
});


//값 업데이트
router.post('/revice_apply_update', isLoggedIn, async (req,res) =>{
    const data_result = req.body.col1;

    try{
        await Sales.update({
            Approval: 1,
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

module.exports = router;
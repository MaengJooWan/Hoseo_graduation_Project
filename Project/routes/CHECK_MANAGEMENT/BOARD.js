var express = require('express');

const { User, Board, Sequelize: {Op}, Sequelize: {col} } = require('../../models');
const { isLoggedIn } = require('../Login/middlewares');
const router = express.Router();


var search;
var recheck = 0;


// 게시글 검색
router.post('/search_result', function (req, res) {
    console.log("검색 접근");
    recheck = 1;
    search = req.body.Search;
});

// 글쓰기
router.get('/write', isLoggedIn, function (req, res) {
    res.render('CHECK_MANAGEMENT/Board_write.ejs', {
        title : 'Smart ERP - 공지사항 글쓰기',
        user: req.user,
    });
});

//글보기
router.get('/view/:id', isLoggedIn, function(req,res){
    
    console.log("보기 접속");
    console.log(req.params.id);
    var notice = function(){
    return Board.findAll({
        include: {
            model: User,
            attributes: ['id','Name'],
            required: false
        },
            where: {id: req.params.id},
            order: [['id','DESC']],
        })
            .then((notice) => {
                return notice;
        })
            .catch((error) =>{
                console.log(error);
                next(error);
        });
    }

    notice().then(function(result){
        console.log(result.length);
        res.render('CHECK_MANAGEMENT/Board_read.ejs', {
            title : 'Smart ERP - 글보기',
            user: req.user,
            rv: result,
            page_num : req.params.num,
        });
        console.log(result[0].Title);
    });
});

//메인
router.get('/', function(req,res,next){
    res.redirect('/board/1');
});

// 글조회
router.get('/:num', isLoggedIn, function (req, res) {
    if(recheck==0){
        var notice = function(){
        return Board.findAll({
            include: {
                model: User,
                attributes: ['id','Name'],
                required: false
            },
                order: [['id','DESC']],
            })
                .then((notice) => {
                    return notice;
            })
                .catch((error) =>{
                    console.log(error);
                    next(error);
            });
        }
    }else{
        var notice = function(){
        return Board.findAll({
            include: {
                model: User,
                attributes: ['id','Name'],
                required: false
            },
                where: {Title: {[Op.like]: "%" + search + "%"}},
                order: [['id','DESC']],
            })
                .then((notice) => {
                    return notice;
            })
                .catch((error) =>{
                    console.log(error);
                    next(error);
            });
        }
    }

    recheck = 0;
    


    notice().then(function(result){
        console.log(result.length);
        res.render('CHECK_MANAGEMENT/Board.ejs', {
            title : 'Smart ERP - 공지사항',
            user: req.user,
            rv: result,
            page_num : req.params.num,
        });
    });


});

module.exports = router;

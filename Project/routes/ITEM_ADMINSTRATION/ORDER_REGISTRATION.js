var express = require('express');
const { isLoggedIn } = require('../Login/middlewares');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Stationery } = require('../../models');

var New_File_Name;

fs.readdir('images/', (error) => {
    if (error) {
        console.log("images 폴더가 없어서 images 폴더를 생성합니다.");
        fs.mkdirSync('images');
    }
});


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cd){
            cd(null, 'images/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            New_File_Name = path.basename(file.originalname, ext) + new Date().valueOf() + ext;
            cb(null, New_File_Name);
        },
    }),
    limits: {fileSize : 5 * 1024 * 1024},
});

//이미지 업로드
router.post('/img', isLoggedIn, upload.single('img'), (req,res) =>{
    console.log("접근");
    console.log(New_File_Name);
    res.json({url : req.file.filename});
});


//페이지 로딩 시
router.get('/', isLoggedIn, function(req,res){

    var result = function(){
    return Stationery.findAll({
            order: [['id','DESC']],
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
        res.render('ITEM_ADMINSTRATION/Order_registration.ejs', {
            title : 'Smart ERP - 물품등록',
            user: req.user,
            rv: result_value,
        });
    });
});


//등록
router.post('/order_add', async function(req,res){
    console.log("물품등록 접근");
    const {Order_Name, url} = req.body;

    console.log(Order_Name);
    console.log(New_File_Name);

    try{
        await Stationery.create({
            Name: Order_Name,
            Link : New_File_Name,
        });
        res.send({ok : 1});
    } catch (error){
        res.send({ok : 0});
        return next(error);
    }
});

module.exports = router;
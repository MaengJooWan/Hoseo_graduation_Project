var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ejs = require('ejs');
const multer = require("multer");

var mysqls = mysql.createConnection({
    user: 'root',
    password: '20161474',
    database: 'fiveg',
    dateStrings: 'date',
    multipleStatements: true
});

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../uploads/img/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});

const upload1 = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../uploads/file/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});

router.post('/login', function (req, res, next) {
    ID = req.body.ID;
    PW = req.body.PW

    console.log('아이디: ' + ID + " " + "비밀번호: " + PW);

    mysqls.query('SELECT * FROM user where ID=?', [ID], function (error, result) {
        if (error) {
            console.log(error);
        }
        console.log('조회된 비밀번호 :' + result[0].PWD);
        if (PW == result[0].PWD) {
            console.log(ID + '님이 로그인하셨습니다.');
            console.log(ID + '님 로그인처리 완료');
            req.session.loginid = ID;
            req.session.power = result[0].POWER;
            console.log(ID + '세션 등록');
            res.redirect('http://127.0.0.1:3000/order_registration');
        }
    });
});

router.post('/upload', upload.single('img'), (req, res) => {
    res.send(req.file.originalname);
});

router.post('/upload1', upload1.single('file'), (req, res) => {
    res.send(req.file.originalname);
});

router.get('/', function (req, res, next) {
    if (req.session.loginid == undefined) {
        const data = {name: "방문자", power_check: 2};
        res.render('./ITEM_ADMINSTRATION/Order_registration.ejs', data);
    } else {
        const data = {name: req.session.loginid, power_check: req.session.power,};
        res.render('./ITEM_ADMINSTRATION/Order_registration.ejs', data);
    }
});

router.post('/write', function (req, res) {
    var name;
    var company;
    var quantity;
    var explanation;
    var img_name;
    var file_name;
    var inspector;
    var optradio;

    optradio = req.body.optradio;
    name = req.body.name;
    quantity = req.body.quantity;
    company = req.body.company;
    explanation = req.body.explanation;
    img_name = req.body.imgFile;
    file_name = req.body.DOCUMENT;
    inspector = req.body.inspector;

    var img_path = img_name.split('\\');
    var file_path = file_name.split('\\');


    console.log('체크: ' + optradio + '이름: ' + name + '수량: ' + quantity + '회사: ' + company + '내용: ' + explanation + '이미지 파일 이름: ' + img_name + '문서 파일 이름: ' + file_name + '담당자 이름: ' + inspector);

    mysqls.query('insert into orders_item(name, quantity, company, explanation, img_name, file_name, inspector) values(?,?,?,?,?,?,?)', [name, quantity, company, explanation, img_path[2], file_path[2], inspector], function (err, result) {
        if (err) {
            console.log('err: ' + err);
        }

    });
    res.redirect('http://127.0.0.1:3000/order_registration');
});
module.exports = router;

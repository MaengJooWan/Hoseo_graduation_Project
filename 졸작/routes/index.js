var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ejs = require('ejs');

var mysqls = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'fiveg',
    dateStrings: 'date',
    multipleStatements: true
});

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.loginid == undefined) {
        mysqls.query('SELECT * FROM notice limit 0,10', function (error, results) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: "방문자", notice_data: results, power_check: 2};
                res.render('Main_index.ejs', data);
            }
        });

    } else {
        mysqls.query('SELECT * FROM notice limit 0,10', function (error, results) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: req.session.loginid, notice_data: results, power_check: req.session.power};
                res.render('Main_index.ejs', data);
            }
        });
    }
});

router.post('/login', function (req, res, next) {
    ID = req.body.ID;
    PW = req.body.PW;

    console.log('아이디: ' + ID + " " + "비밀번호: " + PW);

    mysqls.query('SELECT * FROM user where ID=?', [ID], function (error, result) {
        mysqls.query('SELECT * FROM notice limit 0,10', function (error, results) {
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
                const data = {name: ID, notice_data: results, power_check: req.session.power};
                res.render('Main_index.ejs', data);
            }
        });
    });
});

module.exports = router;

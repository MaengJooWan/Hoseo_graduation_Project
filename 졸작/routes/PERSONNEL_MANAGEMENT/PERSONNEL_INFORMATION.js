var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ejs = require('ejs');

var mysqls = mysql.createConnection({
    user: 'root',
    password: '20161474',
    database: 'fiveg',
    dateStrings: 'date',
    multipleStatements: true
});

router.post('/login', function (req, res, next) {
    ID = req.body.ID;
    PW = req.body.PW

    console.log('아이디: ' + ID + " " + "비밀번호: " + PW);

    mysqls.query('SELECT * FROM user where ID=?', [ID], function (error, result) {
        mysqls.query('SELECT * FROM warehousing limit ?,10', [start_page], function (error, results) {
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
                res.redirect('http://127.0.0.1:3000/quality_management');
            }
        });
    });
});

router.get('/', function (req, res, next) {
    var number = req.query.number;

    console.log('번호: ' + number);

    if(number == undefined){
        number = 0;
    }


    if (req.session.loginid == undefined) {
        if (number == 0) {
            const data = {name: req.session.loginid, power_check: req.session.power,};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information.ejs', data);
        } else if (number == 1) {
            const data = {name: req.session.loginid, power_check: req.session.power,};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information1.ejs', data);
        } else if (number == 2) {
            const data = {name: req.session.loginid, power_check: req.session.power,};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information2.ejs', data);
        } else if (number == 3) {
            const data = {name: req.session.loginid, power_check: req.session.power,};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information3.ejs', data);
        } else if (number == 4) {
            const data = {name: req.session.loginid, power_check: req.session.power,};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information4.ejs', data);
        }
    }
    else{
        if (number == 0) {
            const data = {name: "방문자", power_check: 2};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information.ejs', data);
        } else if (number == 1) {
            const data = {name: "방문자", power_check: 2};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information1.ejs', data);
        } else if (number == 2) {
            const data = {name: "방문자", power_check: 2};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information2.ejs', data);
        } else if (number == 3) {
            const data = {name: "방문자", power_check: 2};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information3.ejs', data);
        } else if (number == 4) {
            const data = {name: "방문자", power_check: 2};
            res.render('./PERSONNEL_MANAGEMENT/Personnel_information4.ejs', data);
        }
    }
});


module.exports = router;

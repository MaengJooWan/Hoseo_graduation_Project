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
    PW = req.body.PW;

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
            res.redirect('http://127.0.0.1:3000/forwarding_quantity_graph');
        }
    });
});


router.post('/', function (req, res, next) {
    var year;
    year = req.body.years;
    console.log(year);

    var c_year = year.split('-');

    console.log(c_year[0]);

    if (req.session.loginid == undefined) {
        if (year == undefined) {
            mysqls.query('SELECT * from monthly_receiving_volume where year = ?', ['2019'], function (error, result) {
                const data = {name: "방문자", power_check: 2, forward_graph_d: result};
                res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
            });
        } else {
            mysqls.query('SELECT * from monthly_receiving_volume where year = ?', [c_year[0]], function (error, result) {
                const data = {name: "방문자", power_check: 2, forward_graph_d: result};
                res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
            });
        }
    } else {
        if (year == undefined) {
            mysqls.query('SELECT * from monthly_receiving_volume where year = ?', ['2019'], function (error, result) {
                const data = {
                    name: req.session.loginid,
                    power_check: req.session.power,
                    forward_graph_d: result
                };
                res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
            });
        } else {
            mysqls.query('SELECT * from monthly_receiving_volume where year = ?', [c_year[0]], function (error, result) {
                const data = {
                    name: req.session.loginid,
                    power_check: req.session.power,
                    forward_graph_d: result
                };
                res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
            });
        }
    }
});


router.get('/', function (req, res, next) {
    if (req.session.loginid == undefined) {
        mysqls.query('SELECT * from monthly_receiving_volume where year = ?', ['2019'], function (error, result) {
            const data = {name: "방문자", power_check: 2, forward_graph_d: result};
            res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
        });
    } else {
        mysqls.query('SELECT * from monthly_receiving_volume where year = ?', ['2019'], function (error, result) {
            const data = {
                name: req.session.loginid,
                power_check: req.session.power,
                forward_graph_d: result
            };
            res.render('./CHECK_MANAGEMENT/Forwarding_quantity_graph.ejs', data);
        });
    }
});


module.exports = router;

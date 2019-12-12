var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ejs = require('ejs');
var ID;
var PW;
var startNumber = 0;
var lastNumber = 4;
var curNumber = 0;
var page_number = 10;
var check_page_number;
var start_page;
var last_page;

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
        mysqls.query('SELECT * FROM orders_item limit ?,10', [start_page], function (error, results) {
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
                res.redirect('http://127.0.0.1:3000/order_stanby');
            }
        });
    });
});

router.get('/', function (req, res, next) {
    curNumber = req.query.page;
    if (curNumber == undefined) {
        curNumber = 1;
    }

    console.log('현재 페이지: ' + curNumber);

    if (curNumber <= 0) {
        curNumber = 1;
    }

    last_page = curNumber * 10;
    start_page = last_page - 10;

    console.log('가져올 페이지: ' + last_page);
    if (req.session.loginid == undefined) {
        mysqls.query('SELECT * FROM orders_item limit ?,10', [start_page], function (error, result) {
            if (error) {
                console.log('에러:' + error);
            }
            mysqls.query('SELECT * FROM orders_item limit ?,10', [start_page + 10], function (error, results) {
                if (error) {
                    console.log('에러:' + error);
                }
                check_page_number = results.length;
                console.log('다음 게시글 개수: ' + check_page_number);
                page_number = result.length;
                console.log('게시글 개수: ' + page_number);
                const data = {
                    name: "방문자",
                    check_v: 1,
                    power_check: 2,
                    order_d: result,
                    startNumber: startNumber,
                    lastNumber: lastNumber,
                    curNumber: curNumber,
                    check_page_number: check_page_number,
                    page_number: page_number
                };
                res.render('./ITEM_ADMINSTRATION/Order_standby.ejs', data);
            });
        });
    } else {
        mysqls.query('SELECT * FROM orders_item limit ?,10', [start_page], function (error, result) {
            if (error) {
                console.log('에러:' + error);
            }
            mysqls.query('SELECT * FROM orders_item limit ?,10', [start_page + 10], function (error, results) {
                if (error) {
                    console.log('에러:' + error);
                }
                check_page_number = results.length;
                console.log('다음 게시글 개수: ' + check_page_number);
                page_number = result.length;
                console.log('게시글 개수: ' + page_number);
                const data = {
                    name: req.session.loginid,
                    check_v: 1,
                    power_check: req.session.power,
                    order_d: result,
                    startNumber: startNumber,
                    lastNumber: lastNumber,
                    curNumber: curNumber,
                    check_page_number: check_page_number,
                    page_number: page_number
                };
                res.render('./ITEM_ADMINSTRATION/Order_standby.ejs', data);
            });
        });
    }
});

router.post('/view', function (req, res) {
    var name;
    var quantity;
    var company;
    var inspector;
    var approver;

    name = req.body.name;
    quantity = req.body.quantity;
    company = req.body.company;
    inspector = req.body.inspector;
    approver = req.body.approver;

    console.log(name + quantity + company + inspector + approver);
    mysqls.query('SELECT * FROM orders_item where name = ? and quantity = ? and company = ? and inspector =?', [name, quantity, company, inspector], function (error, result) {
        if (error) {
            console.log('에러: ' + error);
        } else {
            const data = {name: req.session.loginid, power_check: req.session.power, order_d: result};
            res.render('./ITEM_ADMINSTRATION/Order_standby_view.ejs', data);
        }
    });
});

router.post('/write', function (req, res, err) {
    var approver;
    var name;
    var quantity;
    var company;
    var inspector;
    var approver;
    var explanation;

    name = req.body.name;
    quantity = req.body.quantity;
    company = req.body.company;
    inspector = req.body.inspector;
    approver = req.body.approver;
    explanation = req.body.explanation;

    console.log(name + quantity + company + inspector + approver + explanation);

    mysqls.query('update orders_item set approver = ? where name = ? and quantity = ? and company = ? and inspector = ? and explanation = ?', [approver, name, quantity, company, inspector, explanation], function (error, result) {
        if (error) {
            console.log('에러: ' + error);
        } else {
            res.redirect('http://127.0.0.1:3000/order_stanby');
        }
    });


});

router.get('/search', function (req, res, err) {
    var item_name;
    var date;

    item_name = req.query.item_name;
    date = req.query.day;
    curNumber = req.query.page;

    if (curNumber == undefined) {
        curNumber = 1;
    }

    console.log('현재 페이지: ' + curNumber);

    if (curNumber <= 0) {
        curNumber = 1;
    }

    last_page = curNumber * 10;
    start_page = last_page - 10;

    if (item_name != "" && date == "") {
        console.log(' 1 품목이름: ' + item_name + '날짜: ' + date);
        if (req.session.loginid == undefined) {
            mysqls.query('SELECT * FROM warehousing where name = ? limit ?,10', [item_name, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where name = ? limit ?,10', [item_name, start_page], function (error, results) {
                    if (error) {
                        console.log('에러:' + error);
                    }
                    check_page_number = results.length;
                    console.log('다음 게시글 개수: ' + check_page_number);
                    page_number = result.length;
                    console.log('게시글 개수: ' + page_number);
                    const data = {
                        name: "방문자",
                        check_v: 2,
                        power_check: 2,
                        item_name: item_name,
                        day: date,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Recive_management.ejs', data);
                });
            });

        } else {
            mysqls.query('SELECT * FROM warehousing where name = ? limit ?,10', [item_name, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where name = ? limit ?,10', [item_name, start_page], function (error, results) {
                    if (error) {
                        console.log('에러:' + error);
                    }
                    check_page_number = results.length;
                    console.log('다음 게시글 개수: ' + check_page_number);
                    page_number = result.length;
                    console.log('게시글 개수: ' + page_number);
                    const data = {
                        name: req.session.loginid,
                        check_v: 2,
                        item_name: item_name,
                        day: date,
                        power_check: req.session.power,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Recive_management.ejs', data);
                });
            });
        }
    } else if (item_name == "" && date != "") {
        console.log(' 2 품목이름: ' + item_name + '날짜: ' + date);
        if (req.session.loginid == undefined) {
            mysqls.query('SELECT * FROM warehousing where receiving_date = ? limit ?,10', [date, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where receiving_date = ? limit ?,10', [date, start_page], function (error, results) {
                    if (error) {
                        console.log('에러:' + error);
                    }
                    check_page_number = results.length;
                    console.log('다음 게시글 개수: ' + check_page_number);
                    page_number = result.length;
                    console.log('게시글 개수: ' + page_number);
                    const data = {
                        name: "방문자",
                        check_v: 2,
                        power_check: 2,
                        item_name: item_name,
                        day: date,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Recive_management.ejs', data);
                });
            });
        } else {
            mysqls.query('SELECT * FROM warehousing where receiving_date = ? limit ?,10', [date, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where receiving_date = ? limit ?,10', [date, start_page], function (error, results) {
                    if (error) {
                        console.log('에러:' + error);
                    }
                    check_page_number = results.length;
                    console.log('다음 게시글 개수: ' + check_page_number);
                    page_number = result.length;
                    console.log('게시글 개수: ' + page_number);
                    const data = {
                        name: req.session.loginid,
                        check_v: 2,
                        item_name: item_name,
                        day: date,
                        power_check: req.session.power,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Recive_management.ejs', data);
                });
            });
        }
    }
});
module.exports = router;

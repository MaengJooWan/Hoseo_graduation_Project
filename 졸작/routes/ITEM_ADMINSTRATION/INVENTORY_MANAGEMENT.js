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
                res.redirect('http://127.0.0.1:3000/forward_management');
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
        mysqls.query('SELECT * FROM warehousing limit ?,10', [start_page], function (error, result) {
            if (error) {
                console.log('에러:' + error);
            }
            mysqls.query('SELECT * FROM warehousing limit ?,10', [start_page + 10], function (error, results) {
                if (error) {
                    console.log('에러:' + error);
                }
                check_page_number = results.length;
                console.log('다음 게시글 개수: ' + check_page_number);
                page_number = result.length;
                console.log('게시글 개수: ' + page_number);
                console.log('결과: ' + result);
                const data = {
                    name: "방문자",
                    check_v: 1,
                    power_check: 2,
                    inventory_d: result,
                    startNumber: startNumber,
                    lastNumber: lastNumber,
                    curNumber: curNumber,
                    check_page_number: check_page_number,
                    page_number: page_number
                };
                res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data);
            });
        });
    } else {
        mysqls.query('SELECT * FROM warehousing limit ?,10', [start_page], function (error, result) {
            if (error) {
                console.log('에러:' + error);
            }
            mysqls.query('SELECT * FROM warehousing limit ?,10', [start_page + 10], function (error, results) {
                if (error) {
                    console.log('에러:' + error);
                }
                check_page_number = results.length;
                console.log('다음 게시글 개수: ' + check_page_number);
                page_number = result.length;
                console.log('게시글 개수: ' + page_number);
                console.log('결과: ' + result);
                const data = {
                    name: req.session.loginid,
                    check_v: 1,
                    power_check: req.session.power,
                    inventory_d: result,
                    startNumber: startNumber,
                    lastNumber: lastNumber,
                    curNumber: curNumber,
                    check_page_number: check_page_number,
                    page_number: page_number
                };
                res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data)
            });
        });
    }
});

router.post('/view', function (req, res) {
    var large_category;
    var small_category;
    var name;
    var unique_number;
    var quantity;

    large_category = req.body.large_category;
    small_category = req.body.small_category;
    name = req.body.name;
    unique_number = req.body.unique_number;
    quantity = req.body.quantity;
    if (req.session.loginid == undefined) {
        mysqls.query('SELECT * FROM warehousing where large_category = ? and small_category = ? and name = ? and unique_number =? and quantity =?', [large_category, small_category, name, unique_number, quantity], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: '방문자', power_check: 2, inventory_d: result};
                res.render('./ITEM_ADMINSTRATION/Inventory_management_view.ejs', data);
            }
        });
    }
    else{
        mysqls.query('SELECT * FROM warehousing where large_category = ? and small_category = ? and name = ? and unique_number =? and quantity =?', [large_category, small_category, name, unique_number, quantity], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: req.session.loginid, power_check: 2, inventory_d: result};
                res.render('./ITEM_ADMINSTRATION/Inventory_management_view.ejs', data);
            }
        });
    }
});

router.get('/search', function (req, res, err) {
    var item_name;
    var item_number;

    item_name = req.query.item_name;
    item_number = req.query.item_number;
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

    if (item_name != "" && item_number == "") {
        console.log(' 1 품목이름: ' + item_name + '고유번호: ' + item_number);
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
                        item_number: item_number,
                        inventory_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data);
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
                        item_number: item_number,
                        power_check: req.session.power,
                        inventory_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data);
                });
            });
        }
    } else if (item_name == "" && item_number != "") {
        console.log(' 2 품목이름: ' + item_name + '날짜: ' + item_number);
        if (req.session.loginid == undefined) {
            mysqls.query('SELECT * FROM warehousing where unique_number = ? limit ?,10', [item_number, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where unique_number = ? limit ?,10', [item_number, start_page], function (error, results) {
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
                        item_number: item_number,
                        inventory_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data);
                });
            });
        } else {
            mysqls.query('SELECT * FROM warehousing where unique_number = ? limit ?,10', [item_number, start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where unique_number = ? limit ?,10', [item_number, start_page], function (error, results) {
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
                        item_number: item_number,
                        power_check: req.session.power,
                        inventory_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Inventory_management.ejs', data);
                });
            });
        }
    }
});

module.exports = router;

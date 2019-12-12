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
                res.redirect('http://127.0.0.1:3000/quality_management');
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
        mysqls.query('SELECT DATE_SUB(NOW(), INTERVAL 7 DAY) as day', [start_page], function (error, result1) {
            console.log(result1[0].day);
            var date_token = result1[0].day.split(' ');
            console.log(date_token[0]);
            mysqls.query('SELECT * FROM warehousing where effective_date > ? limit ?,10', [date_token[0], start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where effective_date > ? limit ?,10', [date_token[0], start_page], function (error, results) {
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
                        expiration_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Expiration_of_validity_period.ejs', data);
                });
            });
        });
    } else {
        mysqls.query('SELECT DATE_SUB(NOW(), INTERVAL 7 DAY) as day', [start_page], function (error, result1) {
            console.log(result1[0].day);
            var date_token = result1[0].day.split(' ');
            console.log(date_token[0]);
            mysqls.query('SELECT * FROM warehousing where effective_date > ? limit ?,10', [date_token[0], start_page], function (error, result) {
                if (error) {
                    console.log('에러:' + error);
                }
                mysqls.query('SELECT * FROM warehousing where effective_date > ? limit ?,10', [date_token[0], start_page], function (error, results) {
                    if (error) {
                        console.log('에러:' + error);
                    }
                    check_page_number = results.length;
                    console.log('다음 게시글 개수: ' + check_page_number);
                    page_number = result.length;
                    console.log('게시글 개수: ' + page_number);
                    const data = {
                        name: req.session.loginid,
                        power_check: req.session.power,
                        check_v: 1,
                        expiration_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/Expiration_of_validity_period.ejs', data);
                });
            });
        });
    }
});

router.post('/view', function (req, res) {
    var name;
    var unique_number;
    var quantity;
    var receiving_date;

    name = req.body.name;
    unique_number = req.body.unique_number;
    quantity = req.body.quantity;
    receiving_date = req.body.receiving_date;

    if (req.session.loginid == undefined) {
        console.log(name + unique_number + quantity + receiving_date);
        mysqls.query('SELECT * FROM warehousing where name = ? and unique_number = ? and quantity = ? and receiving_date =?', [name, unique_number, quantity, receiving_date], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: '방문자', power_check: 2, expiration_d: result};
                res.render('./ITEM_ADMINSTRATION/Expiration_of_validity_period_view.ejs', data);
            }
        });
    } else {
        console.log(name + unique_number + quantity + receiving_date);
        mysqls.query('SELECT * FROM warehousing where name = ? and unique_number = ? and quantity = ? and receiving_date =?', [name, unique_number, quantity, receiving_date], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: req.session.loginid, power_check: req.session.power, expiration_d: result};
                res.render('./ITEM_ADMINSTRATION/Expiration_of_validity_period_view.ejs', data);
            }
        });
    }
});

router.get('/write', function (req, res) {
    var unique_number
    unique_number = req.query.unique_number;

    if (req.session.loginid == undefined) {
        res.redirect('http://127.0.0.1:3000/quality_management');
    } else {
        console.log('2');
        mysqls.query('SELECT * FROM warehousing where unique_number = ?', [unique_number], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                const data = {name: req.session.loginid, power_check: req.session.power, quality_d: result};
                res.render('./ITEM_ADMINSTRATION/Quality_management_write.ejs', data);
            }
        });
    }
});

router.post('/write', function (req, res, err) {
    console.log('in1');
    var name;
    var unique_number;
    var quantity;
    var quantity1;
    var quantity2;
    var receiving_date;
    var large_category;
    var small_category;
    var radio_b;
    var forwarding_date;
    var explanation;
    var inspector;

    radio_b = req.body.radio_b;
    large_category = req.body.large_category
    small_category = req.body.small_category
    name = req.body.name;
    unique_number = req.body.unique_number;
    quantity1 = req.body.quantity;
    quantity2 = req.body.quantity1;
    receiving_date = req.body.receiving_date;
    forwarding_date = req.body.forwarding_date;
    explanation = req.body.explanation;
    inspector = req.body.inspector;

    console.log('1: ' + explanation + ' 2: ' + inspector + ' 3: ' + unique_number);

    if (err) {
        console.log(err);
    }

    if (quantity1 == undefined) {
        console.log('1');
        mysqls.query('update warehousing set explanation = ?, inspector = ?, item_inspection = ? where unique_number = ?', [explanation, inspector, '1', unique_number], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                res.redirect('http://127.0.0.1:3000/quality_management');
            }
        });
    } else if (quantity2 == undefined) {
        console.log('2');
        mysqls.query('update warehousing set explanation = ?, inspector = ?, item_inspection = ? where unique_number = ?', [explanation, inspector, '1', unique_number], function (error, result) {
            if (error) {
                console.log(error);
            } else {
                res.redirect('http://127.0.0.1:3000/quality_management');
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
        console.log(' 1 품목이름: ' + item_name + '날짜: ' + item_number);
        if (req.session.loginid == undefined) {
            mysqls.query('SELECT DATE_SUB(NOW(), INTERVAL 7 DAY) as day', [start_page], function (error, result1) {
                console.log(result1[0].day);
                var date_token = result1[0].day.split(' ');
                console.log(date_token[0]);
                mysqls.query('SELECT * FROM warehousing where effective_date > ? and name = ? limit ?,10', [date_token[0], item_name, start_page], function (error, result) {
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
                            recive_d: result,
                            startNumber: startNumber,
                            lastNumber: lastNumber,
                            curNumber: curNumber,
                            check_page_number: check_page_number,
                            page_number: page_number
                        };
                        res.render('./ITEM_ADMINSTRATION/expiration_of_validity_period.ejs', data);
                    });
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
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/expiration_of_validity_period.ejs', data);
                });
            });
        }
    } else if (item_name == "" && item_number != "") {
        console.log(' 2 품목이름: ' + item_name + '날짜: ' + item_number);
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
                        item_number: item_number,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/quality_management.ejs', data);
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
                        item_number: item_number,
                        power_check: req.session.power,
                        recive_d: result,
                        startNumber: startNumber,
                        lastNumber: lastNumber,
                        curNumber: curNumber,
                        check_page_number: check_page_number,
                        page_number: page_number
                    };
                    res.render('./ITEM_ADMINSTRATION/quality_management.ejs', data);
                });
            });
        }
    }
});
module.exports = router;


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

router.get('/', function (req, res, next) {
    const data = {name: "방문자", power_check: 2};
    res.render('./SMART_MANAGEMENT/Inventory_location.ejs', data);
});


module.exports = router;

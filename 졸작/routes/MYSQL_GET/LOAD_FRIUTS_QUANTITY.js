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

router.post('/', function (req, res) {
    mysqls.query('SELECT * FROM warehousing', function (error, result) {
        if (error) {
            console.log(err);
        }
        res.send(result);
    });
});


module.exports = router;

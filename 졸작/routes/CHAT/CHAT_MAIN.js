var express = require('express');
var router = express.Router();

var rooms_array = [];
var count = 0;

router.get('/', function (req, res) {
    const data = {
        name: req.session.loginid,
        power_check: req.session.power,
        rooms_arrays: rooms_array
    };
    res.render('./CHAT/chat.ejs', data);
});

router.get('/in_room', function (req, res) {
    var room_name;

    room_name = req.query.room_name;

    const data = {
        room_name: req.query.room_name,
        name: req.session.loginid,
        power_check: req.session.power
    };
    res.render('./CHAT/chat_room.ejs', data);
});

router.get('/room_array_count', function (req, res) {
    count--;
    if(count <= 0){
        count = 0;
    }
});

router.get('/room', function (req, res) {
    var room_name;

    room_name = req.query.room_name;
    rooms_array[count++] = room_name;

    const data = {
        room_name: req.query.room_name,
        name: req.session.loginid,
        power_check: req.session.power
    };
    res.render('./CHAT/chat_room.ejs', data);
});

module.exports = router;


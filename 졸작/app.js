var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var util = require('util');
var indexRouter = require('./routes/index');
var mysql_get = require('./routes/MYSQL_GET/LOAD_FRIUTS_QUANTITY');
var recive_management = require('./routes/ITEM_ADMINSTRATION/RECIVE_MANAGEMENT');
var forward_management = require('./routes/ITEM_ADMINSTRATION/FORWARD_MANAGEMENT');
var inventory_management = require('./routes/ITEM_ADMINSTRATION/INVENTORY_MANAGEMENT');
var quality_management = require('./routes/ITEM_ADMINSTRATION/QUALITY_MANAGEMENT');
var expiration_of_validity_period = require('./routes/ITEM_ADMINSTRATION/EXPIRATION_OF_VALIDITY_PERIOID');
var order_registration = require('./routes/ITEM_ADMINSTRATION/ORDER_REGISTRATION');
var order_stanby = require('./routes/ITEM_ADMINSTRATION/ORDER_STANBY');
var inventory_location = require('./routes/SMART_MANAGEMENT/INVENTORY_LOCATION');
var personnel_information = require('./routes/PERSONNEL_MANAGEMENT/PERSONNEL_INFORMATION');
var receiving_quantity_graph = require('./routes/CHECK_MANAGEMENT/RECEIVING_QUANTITY_GRAPH');
var forwarding_quantity_graph = require('./routes/CHECK_MANAGEMENT/FORWARDING_QUANTITY_GRAPH');
var chat_main = require('./routes/CHAT/CHAT_MAIN');
var app = express();

// view engine setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'kimminsu',
    resave: false,
    saveUninitialized: true,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/public'));
app.use('/nodeModule', express.static(__dirname + '/node_modules'));
app.use('/upload', express.static(__dirname + '/uploads/img'));
app.use('/upload1', express.static(__dirname + '/uploads/file'));
app.use('/', indexRouter);
app.use('/mysql_get', mysql_get);
app.use('/recive_management', recive_management);
app.use('/forward_management', forward_management);
app.use('/inventory_management', inventory_management);
app.use('/quality_management', quality_management);
app.use('/expiration_of_validity_period', expiration_of_validity_period);
app.use('/order_registration', order_registration);
app.use('/order_stanby', order_stanby);
app.use('/inventory_location', inventory_location);
app.use('/personnel_information', personnel_information);
app.use('/receiving_quantity_graph', receiving_quantity_graph);
app.use('/forwarding_quantity_graph', forwarding_quantity_graph);
app.use('/connect_chat', chat_main);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.io = require('socket.io')();

var rooms = new Array();
var count = 0;

app.io.on('connection', function (socket) {

    socket.on('join_room', function (data) {

        socket.join(data.room);
        console.log(data.room + '방 입장');

        socket.room = data.room;
        socket.nickname = data.user_name;

        console.log('test: ' + socket.room + socket.nickname);

        if (rooms[socket.room] == undefined) {
            console.log('방 생성2: ' + socket.room);
            rooms[socket.room] = new Object();
            rooms[socket.room].socket_ids = new Object();
            rooms[socket.room].socket_users = new Object();
        }

        rooms[socket.room].socket_ids[socket.nickname] = socket.id;
        rooms[socket.room].socket_users = count++;

        data = {
            msg: '[시스템] ' + socket.nickname + '님이 입장하셨습니다.'
        }

        app.io.sockets.in(socket.room).emit('broadcast_msg', data);
        app.io.sockets.in(socket.room).emit('user_list', {
            users: Object.keys(rooms[socket.room].socket_ids)
        });
    });

    socket.on('send_msg', function (data) {
        console.log('전송 요청이 온 방: ' + socket.room);
        data.msg = data.user_name + ' : ' + data.msg;
        console.log('내용: ' + data.msg);
        app.io.sockets.in(socket.room).emit('broadcast_msg', data);
    });

    // force client disconnect from server
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });

    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.nickname);
        if(socket.room != undefined && rooms[socket.room] != undefined){
            if(socket.nickname != undefined){
                if(rooms[socket.room].socket_ids != undefined && rooms[socket.room].socket_ids[socket.nickname] != undefined){
                    delete rooms[socket.room].socket_ids[socket.nickname];
                }
            }
            data = {
                msg: socket.nickname + ' 님이 나가셨습니다...'
            };

            app.io.sockets.in(socket.room).emit('broadcast_msg', data);
            app.io.sockets.in(socket.room).emit('user_list', {
                users: Object.keys(rooms[socket.room].socket_ids)
            });

            socket.leave(socket.room);
        }

    });
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');


var user_chage_update = require('./routes/User_Chage_Update');

//상품관리
var recive_management = require('./routes/ITEM_ADMINSTRATION/RECIVE_MANAGEMENT');
var forward_management = require('./routes/ITEM_ADMINSTRATION/FORWARD_MANAGEMENT');
var order_registration = require('./routes/ITEM_ADMINSTRATION/ORDER_REGISTRATION');
var faulty_registration = require('./routes/ITEM_ADMINSTRATION/FAULTY_REGISTRATION');
var recive_add = require('./routes/ITEM_ADMINSTRATION/RECIVE_ADD');
var recive_apply = require('./routes/ITEM_ADMINSTRATION/RECIVE_APPLY');
var forward_apply = require('./routes/ITEM_ADMINSTRATION/FORWARD_APPLY');
var forward_add = require('./routes/ITEM_ADMINSTRATION/FORWARD_ADD');
var faulty_add = require('./routes/ITEM_ADMINSTRATION/FAULTY_ADD');

//스마트관리
var inventory_location = require('./routes/SMART_MANAGEMENT/INVENTORY_LOCATION');
var product_recommendation_list = require('./routes/SMART_MANAGEMENT/PRODUCT_RECOMMENDATION_LIST');

//조회관리
var personnel_information = require('./routes/PERSONNEL_MANAGEMENT/PERSONNEL_INFORMATION');
var approval_of_subscription = require('./routes/PERSONNEL_MANAGEMENT/APPROVAL_Of_SUBSCRIPTION')

//조회관리
var receiving_quantity_graph = require('./routes/CHECK_MANAGEMENT/RECEIVING_QUANTITY_GRAPH');
var forwarding_quantity_graph = require('./routes/CHECK_MANAGEMENT/FORWARDING_QUANTITY_GRAPH');
var boardRouter = require('./routes/CHECK_MANAGEMENT/BOARD');
var inventory_inquiry = require('./routes/CHECK_MANAGEMENT/INVENTORY_INQUIRY');
var board_write = require("./routes/CHECK_MANAGEMENT/BOARD_WRITE");


const passport = require('passport');
const flash = require('connect-flash');

require('dotenv').config();

const authRouter = require('./routes/Login/auth');
//DB 모델링
const { sequelize } = require('./models');
//로그인
const passportConfig = require('./passport');

var app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use('/static', express.static(__dirname + '/images'));
app.use('/nodeModule', express.static(__dirname + '/node_modules'));
app.use('/upload', express.static(__dirname + '/uploads/img'));
app.use('/upload1', express.static(__dirname + '/uploads/file'));

//상품관리
app.use('/recive_management', recive_management); //입고매니저
app.use('/forward_management', forward_management); //출고매니저
app.use('/order_registration', order_registration); //신규물품매니저
app.use('/faulty_registration', faulty_registration); //불량매니저
app.use('/recive_add', recive_add); //입고등록창
app.use('/recive_apply', recive_apply);//입고승인창
app.use('/forward_apply', forward_apply); //출고승인창
app.use('/forward_add', forward_add); //출고등록창
app.use('/faulty_add', faulty_add); //불량등록창

//스마트관리
app.use('/inventory_location', inventory_location); //제품위치
app.use('/product_recommendation_list',product_recommendation_list); //제품 추천 목록

//인사관리
app.use('/personnel_information', personnel_information); //인사정보
app.use('/approval_of_subscription',approval_of_subscription); //가입승인

//조회관리
app.use('/board', boardRouter);
app.use('/receiving_quantity_graph', receiving_quantity_graph);
app.use('/forwarding_quantity_graph', forwarding_quantity_graph);
app.use('/inventory_inquiry',inventory_inquiry);
app.use('/board_write',board_write);

app.use('/user_chage_update', user_chage_update);
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


module.exports = app;

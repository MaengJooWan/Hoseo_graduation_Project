//로그인 한 상태
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

//로그인 안 한 상태
exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        res.redirect('/');
    }
}
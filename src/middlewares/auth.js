function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin'); // 로그인 페이지로 리디렉션
}

module.exports = isAuthenticated;
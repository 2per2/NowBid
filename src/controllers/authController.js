const db = require("../models");

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const usrCnt = await db.User.count({ where: { email: email }});
            if (usrCnt) {
                res.send('이메일이 이미 존재');
            } else {
                db.User.create({
                    username: username,
                    email: email,
                    password: password
                });
            }

            res.send('회원가입 성공');
        } catch (error) {
            next(error);
        }
    },
    signin: (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
};
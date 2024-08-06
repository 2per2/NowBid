const authService = require("../services/authService");

exports.handleCreateUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = {
            username: username,
            email: email,
            password: password
        };
        
        const exUser = await authService.findUserByEmail(email);

        if (exUser) {
            return res.status(409).json({ error: "사용 중인 이메일입니다." });
        }

        const createdUser = await authService.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
};
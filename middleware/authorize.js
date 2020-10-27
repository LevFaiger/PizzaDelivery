const jwt = require('jsonwebtoken');
const ErrorCustom = require('../utils/ErrorCustom');
const {GetUserById} = require('../data/UserDB');


exports.authorize = async (req, res, next) => {
    let token;
    if (req.cookies.pizzatoken) {
        token = req.cookies.pizzatoken;
    }
    if (!token) {
        return next(new ErrorCustom('Not authorized to access this route', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = GetUserById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorCustom('Not authorized to access this route', 401));
    }
};


const User = require('../models/User')
const { AddUser,GetUserByEmail } = require('../data/UserDB')
const ErrorCustom = require('../utils/ErrorCustom')
const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
// @desc Register user 
// @route POST /api/v1/auth/register
// @access public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, address } = req.body;
        const user = new User(
            name,
            email,
            password,
            address
        );
        await user.encrypt();
        AddUser(user);
        const token = user.getJwtToken();
        res.status(200).cookie('pizzatoken', token, options).json({ success: true, token: token })

    } catch (error) {
        next(error);
    }
}

// @desc login 
// @route POST /api/v1/auth/login
// @access public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorCustom('Please provide an email and password', 400));
        }
        const user = GetUserByEmail(email);

        if (!user) {
            return next(new ErrorCustom('Invalid email', 401));
        }
      
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorCustom('Invalid password', 401));
        }
        const token = user.getJwtToken();
        res.status(200).cookie('pizzatoken', token, options).json({ success: true, token: token })

    } catch (error) {
        next(error);
    }
}

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = async (req, res, next) => {
    res.cookie('pizzatoken', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        data: {},
      });
}
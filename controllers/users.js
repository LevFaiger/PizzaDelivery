const User = require('../models/User');
const { AddUser, DeleteUser,UpdateUser } = require('../data/UserDB')


// @desc      Create user
// @route     POST /api/v1/users
// @access    Public
exports.createUser =async (req, res, next) => {
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
        res.status(200).json({success:true,Data:user})
    } catch (error) {
        next(error);
    }
};

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Public
exports.updateUser =async (req, res, next) => {
    try {
        const user = await UpdateUser(req.params.id,req.body);
        res.status(200).json({success:true,Data:user})
    } catch (error) {
        next(error);
    }
};

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUser = (req, res, next) => {
    try {
        const result = DeleteUser(req.params.id);
        res.status(200).json({success:result})
    } catch (error) {
        next(error);
    }
};
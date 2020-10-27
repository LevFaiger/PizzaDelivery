const { Users } = require('../data/MemoryData');
const jwt = require('jsonwebtoken');

const AddUser = (user) => {
    Users.push(user);
}
const GetUserByEmail = (email) => {
    const user = Users.find(user => user.email == email);
    if (user) {
        return user;
    }
    return null;
}

const GetUserById = (id) => {
    const user = Users.find(user => user.uuid == id);
    if (user) {
        return user;
    }
    return null;
}
const GetCurrentUser = (req) => {
    const token = req.cookies.pizzatoken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.id) {
        return GetUserById(decoded.id);
    }
    else {
        return null;
    }
}

const DeleteUser = (id) => {
    const user = GetUserById(id);
    if (user) {
        var index = Users.indexOf(user);
        Users.splice(index, 1);
        return true;
    }
    return false;
}

   
const UpdateUser =async (id,body)=>{
    debugger;
    const { name, email, password, address } = body;
    const user = GetUserById(id);
    if (user) {
        let updatedUser = Object.assign(user,{ name, email, password, address });
        await user.encrypt();
        var index = Users.indexOf(user);
        Users[index] = updatedUser;
        return updatedUser;
    }
    return user;
}
module.exports = { AddUser, GetUserByEmail, GetUserById, GetCurrentUser,DeleteUser,UpdateUser }
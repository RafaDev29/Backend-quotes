// service.js
const User = require('./model');

async function createUser(userData) {
    return await User.create(userData);
}

async function getUsers() {
    return await User.find();
}

async function getUserById(userId) {
    return await User.findById(userId);
}

async function updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
}

async function deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};

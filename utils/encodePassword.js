var bcrypt = require('bcrypt');

exports.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10)
};

exports.comparePassword = async (plainPass, hashword) => {
    return await bcrypt.compare(plainPass, hashword)
};
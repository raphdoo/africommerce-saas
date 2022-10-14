const bcrypt = require("bcrypt")

async function hashPassword(password) {
    return await bcrypt.hash(password);
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashPassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}
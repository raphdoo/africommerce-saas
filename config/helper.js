const argon2 = require("argon2")

async function hashPassword(password) {
    return await argon2.hash(password);
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await argon2.verify(hashPassword, plainPassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}
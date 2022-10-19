const argon2 = require("argon2")
const jwt = require('jsonwebtoken');
const config = require("./config");

const userModel = require("../model/users")

async function hashPassword(password) {
    return await argon2.hash(password);
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await argon2.verify(hashPassword, plainPassword)
}

async function generateJwtToken(payload) {
    const options = {
        // exp: new Date().setDate(new Date().getDate() + 1),
        // iat: new Date().getTime(),
        secret: config.jwtSecret
    }
    return jwt.sign(payload, options.secret, { expiresIn: '60mins' })
}

async function verifyJwtToken(token) {
    return jwt.verify(token, { secret: config.jwtSecret })
}

async function validateUser(idenity, password) {
    let user = await userModel.findOne({ username: idenity })
    if (!user) {
        user = await userModel.findOne({ email: idenity })
    }
    if (!user) {
        return false
    }
    const verifyPassword = await argon2.verify(user.password, password)
    if (!verifyPassword) {
        return false
    }
    return user;
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateJwtToken,
    verifyJwtToken,
    validateUser
}
const argon2 = require("argon2")
const jwt = require('jsonwebtoken');
const config = require("./config");

const userModel = require("../model/users")

async function hashPassword(password) {
    return await argon2.hash(password);
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await argon2.verify(hashedPassword, plainPassword)
}

async function generateJwtToken(payload) {
    const options = {
        // exp: new Date().setDate(new Date().getDate() + 1),
        // iat: new Date().getTime(),
        secret: config.jwtSecret,
        userId: payload
    }
    return jwt.sign(options, payload)
}

async function verifyJwtToken(token) {
    const verify = await jwt.verify(token, config.jwtSecret)
    return verify
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
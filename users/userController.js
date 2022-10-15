const userModel = require("../model/users")
const { body, validationResult } = require("express-validator")
const { hashPassword } = require("../config/helper")


async function createUser(req, res) {
    const { firstname, lastname, username, email, password, phonenumber } = req.body;
    let userExist = await userModel.findOne({ username: username })
    if (!userExist) {
        userExist = await userModel.findOne({ email: email })
    }
    if (userExist) {
        return res.status(409).send("This user already exist!")
    }
    const newUser = {
        firstname,
        lastname,
        username,
        email,
        password,
        phonenumber
    }
    const hashedPassword = await hashPassword(newUser.password)
    newUser.password = hashedPassword
    const user = await userModel.create(newUser)
    res.json({
        msg: "Registration successful!",
        data: user
    })
}

module.exports = {
    createUser
}
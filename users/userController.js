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
};

async function updateUserById (req, res) {
    const id = req.params.id;
    const bodyToUpdate = req.body;

    let user = await userModel.findByIdAndUpdate(id, bodyToUpdate, {new: true});

    if (!user) {
        return res.status(404).send("User does not exit")
    }
    res.status(201).json({
        msg: "User updated Successfully",
        data: user
    })
};

async function deleteUserById(req, res) {
    const id = req.params.id;

    const user = await userModel.findByIdAndDelete({_id: id})

    res.status(201).json({
        status: true,
        user
    })
}


module.exports = {
    createUser,
    updateUserById,
    deleteUserById
}
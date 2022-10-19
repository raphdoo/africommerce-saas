const userModel = require("../../model/users")
const { body, validationResult } = require("express-validator")
const { hashPassword } = require("../../config/helper")


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


async function getAllUser(req, res) {
    const user = await userModel.find({});
    res.status(200).json({
        msg: "all users",
        data: user
    })
}

async function getOneUser(req, res) {
    const userId = req.params.id
    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(404).send("User with this id does not exist!")
    }
    res.status(200).send(user)
}

async function updateUserById(req, res) {
    const id = req.params.id;
    const bodyToUpdate = req.body;

    let user = await userModel.findByIdAndUpdate(id, bodyToUpdate, { new: true });

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

    const user = await userModel.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).send("Can't delete! user does not exist!")
    }
    user.delete()
    res.json({
        status: 200,
        msg: "User deleted successfully!"
    })
}


module.exports = {
    createUser,
    updateUserById,
    deleteUserById,
    getAllUser,
    getOneUser
}
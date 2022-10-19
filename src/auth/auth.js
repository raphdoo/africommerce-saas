const { validateUser, generateJwtToken } = require("../../config/helper")


async function login(req, res) {
    const { identity, password } = req.body
    const user = await validateUser(identity, password)
    if (!user) {
        return res.status(401).send("Invalid crendentials!")
    }
    const token = await generateJwtToken(user.id)
    res.status(200).json({
        accessToken: token
    })
}


module.exports = {
    login
}
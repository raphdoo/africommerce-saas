const { verifyJwtToken } = require('../config/helper')

async function isLoggedIn(req, res, next) {
    const header = req.headers.authorization
    const token = header.split(' ')[1]
    const tokenValid = await verifyJwtToken(token)
    if (!tokenValid) {
        return res.status(401).send("Unauthorized!")
    }
    console.log(token)
    console.log(tokenValid)
    next()
}

module.exports = {
    isLoggedIn
}
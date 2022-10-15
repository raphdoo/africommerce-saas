const express = require('express');
const router = express.Router();
const { createUser } = require("./userController")
const { validateUser, validate } = require("../middleware/userValidation")


/* GET users listing. */
router.post('/', validateUser(), validate, createUser)

module.exports = router;

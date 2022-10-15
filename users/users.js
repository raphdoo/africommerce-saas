const express = require('express');
const router = express.Router();
const { createUser, updateUserById, deleteUserById} = require("./userController")
const { validateUser, validate } = require("../middleware/userValidation")


/* GET users listing. */
router.post('/', validateUser(), validate, createUser);
router.put('/:id',  updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;

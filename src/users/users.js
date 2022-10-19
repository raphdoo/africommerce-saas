const express = require('express');
const router = express.Router();
const {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUser,
  getOneUser
} = require("./userController")
const { validateUser, validate } = require("../../middleware/userValidation")


/* GET users listing. */
router
  .route('/')
  .post(validateUser(), validate, createUser)
  .get(getAllUser)


router
  .route('/:id')
  .put(updateUserById)
  .get(getOneUser)
  .delete(deleteUserById)

module.exports = router;

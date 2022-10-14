const express = require('express');
const router = express.Router();

const userModel = require("../model/users")

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.body = { firstName, }
  res.send('respond with a resource');
});

module.exports = router;

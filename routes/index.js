const express = require('express');
const productRoute = require("../src/products/productRoute");
const userRoute = require("../src/users/users")

const passport = require('passport')
<<<<<<< HEAD
require('../src/auth/passport')
const { isLoggedIn } = require('../middleware/authenicate')
=======

>>>>>>> origin/main

const rootRouter = express.Router();


/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

rootRouter.use('/users', userRoute);
<<<<<<< HEAD
rootRouter.use('/products', isLoggedIn, productRoute)
rootRouter.use('/auth', authRoute)
=======
rootRouter.use('/products', productRoute)

>>>>>>> origin/main


module.exports = rootRouter;

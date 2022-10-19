const express = require('express');
const productRoute = require("../src/products/productRoute");
const userRoute = require("../src/users/users")
const authRoute = require('../src/auth/authRouter')

const passport = require('passport')
require('../src/auth/passport')


const rootRouter = express.Router();

/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

rootRouter.use('/users', userRoute);
rootRouter.use('/products', passport.authenticate('jwt', { session: false }), productRoute)
rootRouter.use('/auth', authRoute)


module.exports = rootRouter;

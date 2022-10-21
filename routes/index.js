const express = require('express');
const productRoute = require("../src/products/productRoute");
const userRoute = require("../src/users/users")

const passport = require('passport')


const rootRouter = express.Router();


/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

rootRouter.use('/users', userRoute);
rootRouter.use('/products', productRoute)



module.exports = rootRouter;

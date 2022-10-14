const express = require('express');
const productRoute = require("../products/productRoute");
const userRoute = require("../users/users")


const rootRouter = express.Router();

/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

rootRouter.use('/users', userRoute);
rootRouter.use('/products', productRoute)


module.exports = rootRouter;

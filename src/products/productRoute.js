const express = require("express");

const productRoute = express.Router();
const authenticate = require('../../middleware/authenticate')


// productRoute.use(passport.authenticate('jwt', { session: false }))


const {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require("./productController")
const { validateProduct, validate } = require("../../middleware/productValidation")

productRoute.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        next()
    })

    .post(validateProduct(), validate, createProduct)
    .get(getAllProducts)

productRoute.route('/:id')
    .put(updateProduct)
    .get(getProduct)

module.exports = productRoute;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const products = require("../model/products")

const productRoute = express.Router();

productRoute.use(bodyParser.json());

productRoute.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        next()
    })
    .get((req, res, next) => {

    })

module.exports = productRoute;
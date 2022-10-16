const productModel = require("../model/products");

const createProduct = async (req, res, next) => {
  //
};

const updateProduct = async (req, res, next) => {
  //
};

const getProductById = async (req, res, next) => {
  //Gettting the product through the params
  try {
    // Checks for the id
    const { id } = req.param.id;
    const product = await productModel.findById(id);
    return res.json({ status: true, product: product });
  } catch (error) {
    /**
     * In case of error
     * send to error handling middleware
     */
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  //
};

const deleteProduct = async (req, res, next) => {
  //Got the id through the params
  const { id } = req.param.id;

  // So basically the product return the deleted product
  const product = await productModel.findOneAndDelete(id).then((m) => {
    return m;
  });
  res.status(200).json({ status: true, product });

  //
};

module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
};

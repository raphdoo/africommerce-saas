const Product = require('../model/products')

const createProduct = async (req, res, next) => {
  try {
    /**
     * create new product with required parameters
     */
    const productToSave = new productModel({
      name: req.body.name,
      brand_name: req.body.brand_name,
      category: req.body.category,
      Quantity: req.body.Quantity,
      price: req.body.price,
      desc: req.body.desc,
      owner_id: req.user.id,
      rating: req.body.rating,
      images: req.body.images,
    })

    /**
     * check for optional parameters and add to
     * product if present
     */
    if (req.body.product_details) {
      productToSave.product_details = req.body.product_details
    }

    if (req.body.warranty) {
      productToSave.warranty = req.body.warranty
    }

    /**
     * Save product
     */
    const savedProduct = await productToSave.save()

    /**
     * Send a response to the client
     */
    res.status(201).json({
      status: true,
      product: savedProduct,
    })
  } catch (error) {
    /**
     * In case of error
     * send to error handling middleware
     */
    next(error)
  }
}

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find()
        res.status(200).json({nbHits:products.length, products})
    } catch (error) {
        console.log(error);
    }
    
}



const getProduct = async (req,res) => {
    try {
        const {id:productID} = req.params// destructured the req.params.id and passed it to var
        const product = await Product.findOne({_id:productID})
        res.status(200).json({product})
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req,res) => {
    const {id:productID} = req.params
    try {
        const product = await Product.findOneAndUpdate({_id:productID},req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({msg:'product updated successfully', product})
    } catch (error) {
        console.log(error);
    }
    

}

const deleteProduct = async (req,res) => {
    try {
        const {id:productID} = req.params
        const product = await Product.findOneAndDelete({_id:productID})
        res.status(200).json({msg:'product deleted successfully'})
    } catch (error) {
        console.log(error);
    }
    

}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

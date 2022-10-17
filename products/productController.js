const Product = require('../model/products')

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
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

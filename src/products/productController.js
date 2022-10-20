const Product = require('../../model/products')


const createProduct = async (req, res, next) => {
    /**
     * create new product with required parameters
     */
    const productToSave = new Product({
        name: req.body.name,
        brand_name: req.body.brand_name,
        category: req.body.category,
        quantity: req.body.quantity,
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
}

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ nbHits: products.length, products })

}



const getProduct = async (req, res) => {
    const { id: productID } = req.params// destructured the req.params.id and passed it to var
    const product = await Product.findOne({ _id: productID })
    res.status(200).json({ product })

}

const updateProduct = async (req, res) => {
    const productID = req.params.id
    const { name, price, quantity, desc } = req.body
    const product = await Product.findByIdAndUpdate(productID, req.body, { new: true })
    if (!product) {
        return res.status(404).send("Product to update not found!")
    }
    res.status(200).json({ msg: 'product updated successfully', product })


}

const deleteProduct = async (req, res) => {
    const productID = req.params.id
    const product = await Product.findOneAndDelete({ _id: productID })
    if (!product) {
        return res.status(404).send("Product with this id not found!")
    }
    res.status(200).json({ msg: 'product deleted successfully' })


}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

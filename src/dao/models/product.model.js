import mongoose from 'mongoose';

const collection = "products"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true,
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: Array
})

const productModel = mongoose.model(collection, productSchema);

export default productModel;


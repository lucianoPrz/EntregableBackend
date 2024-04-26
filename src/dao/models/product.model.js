import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    thumbnail: String,
    owner: {
        type: String,
        default: "admin"
    }

})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection, productSchema);

export default productModel;


import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    age: Number,
    password: {
        type: String,
        require: true
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts',
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: "user"
    },
})

const userModel = mongoose.model(collection, schema);

export default userModel;
import mongoose from 'mongoose';

const collection = "messages";

const messsageSchema = new mongoose.Schema({
    user: String,
    message: String
})

const messageModel = mongoose.model(collection, messsageSchema)

export default messageModel;
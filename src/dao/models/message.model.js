import mongoose from 'mongoose';

const collection = "messages";

const messsageSchema = new mongoose.Schema({
    user: String,
    message: String
})

const messageModel = new mongoose.Model(collection, messsageSchema)

export default messageModel;
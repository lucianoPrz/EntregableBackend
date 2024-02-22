import userModel from "../../models/user.model.js";

export default class User{
    constructor(){
        console.log('DBManager funcionando');
    }
    getAll = async () => {
        let users= await userModel.find().lean();
        return users
    };
    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result
    };
    getBy = async (params) => {
        let result = await userModel.find(params).lean();
        return result
    };
    updateUser = async (id, user) => {
        delete user._id;
        let result = await userModel.updateOne({_id:id}, {$set: user})
        return result;
    };
}
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
        let result = await userModel.findOne(params).lean();
        return result
    };
    getByEmail = async (email) => {
        console.log("managerDB");
        let result = await userModel.findOne({email: email});
        return result
    }
    updateUser = async (id, user) => {
        delete user._id;
        let result = await userModel.updateOne({_id:id}, {$set: user})
        return result;
    };
    changeRole = async (id, role) => {
        let result = await userModel.findByIdAndUpdate(id, {role: role}, { new: true })
        return result
    }
    deleteUser = async (id) => {
        let result = await userModel.deleteOne({_id: id})
        return result
    }
}
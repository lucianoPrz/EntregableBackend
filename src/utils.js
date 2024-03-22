import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import { Faker, es, en } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { options } from "./config/config.js";

export const customFaker = new Faker({ locale: [en] });

const { commerce, image, database, string, internet, datatype, lorem } = customFaker;

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname



export const generateProduct = () =>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        code: string.alphanumeric(10),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(2)),
        category: commerce.department(),
        thumbnail: [image.url()],
    }
}

export const generateEmailToken = (email,expireTime)=>{
    //const token = jwt.sign({email},options.gmail.emailToken,{expiresIn:810}); //expireTime
    const token = jwt.sign({email},options.mailing.PASSWORD,{expiresIn:expireTime}); //
    return token;
};


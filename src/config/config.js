import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

export const options = {
    mailing:{
        SERVICE: process.env.MAILING_SERVICE,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    },
    server: {
        port: PORT
    },
    mongo: {
        url: MONGO_URL,
        secret: SECRET
}
}
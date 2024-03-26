import __dirname from "../utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import path from 'path'

const swaggerOptions ={
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Ecommerce TP Coder",
            version: "1.0.0",
            description: "Definicion de endpoints"
        }
    },
    apis:[`${path.join(__dirname,"../docs/**/*.yaml")}`]
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
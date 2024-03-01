import { Router } from "express";
import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
import { CartController } from "../controller/cart.controller.js";
import { checkRole } from "../middlewares/auth.js";
import { generateProduct } from "../utils.js";

const router = Router();

router.get('/', (req, res) => {
    const cant = 100;
    let products = [];
    for (let i = 0; i < cant; i++) {
        const product = generateProduct()
        products.push(product);
        
    }
    res.json({status: "success", payload: products});
})

export { router as mockRouter }
import { Router} from "express";
import { ProductManagerFile } from "../dao/managers/ProductManagerFile.js";
import productModel from "../dao/models/product.model.js";
import messageModel from "../dao/models/message.model.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    const products = await productModel.find();

    res.render('home', { products: products});
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productModel.find();

    res.render('realTimeProducts', { products: products});
})

router.get('/chat', async (req, res) => {
    res.render('chat', { })
})

export { router as viewRouterDB}
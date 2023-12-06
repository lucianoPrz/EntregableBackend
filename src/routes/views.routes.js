import { Router} from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    const products = await productManagerFile.getProducts();

    res.render('home', { products: products});
})

export { router as viewRouter}
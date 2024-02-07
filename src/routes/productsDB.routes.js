import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { ProductManagerDB } from "../dao/DBManagers/ProductManagerDB.js";
import productModel from "../dao/models/product.model.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

router.get('/', ProductController.getProducts);

router.get('/:pid', ProductController.getProductById)

router.post('/', ProductController.saveProduct)

router.put('/:pid', ProductController.updateProduct)

router.delete('/:pid', ProductController.deleteProduct)

export { router as productRouterDB }
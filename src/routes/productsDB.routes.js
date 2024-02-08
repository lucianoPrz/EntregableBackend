import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";


const router = Router();

router.get('/', ProductController.getProducts);

router.get('/:pid', ProductController.getProductById)

router.post('/', ProductController.saveProduct)

router.put('/:pid', ProductController.updateProduct)

router.delete('/:pid', ProductController.deleteProduct)

export { router as productRouterDB }
import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { checkRole } from "../middlewares/auth.js";


const router = Router();

router.get('/', ProductController.getProducts);

router.get('/:pid', ProductController.getProductById)

router.post('/', checkRole(["admin"]), ProductController.saveProduct)

router.put('/:pid', checkRole(["admin"]), ProductController.updateProduct)

router.delete('/:pid', checkRole(["admin"]), ProductController.deleteProduct)

export { router as productRouterDB }
import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { checkRole } from "../middlewares/auth.js";


const router = Router();

router.get('/', ProductController.getProducts);

router.get('/:pid', ProductController.getProductById)

router.post('/',  ProductController.saveProduct)

router.put('/:pid', /*checkRole(["admin"]),*/ ProductController.updateProduct)

router.delete('/:pid', /*checkRole(["admin"]),*/ ProductController.deleteProduct)

router.get('/mockingproducts', (req, res) => {
    const cant = 100;
    let users = [];
    for (let i = 0; i < cant; i++) {
        const user = generateUser()
        users.push(user);
        
    }
    res.json({status: "success", payload: users});
})

export { router as productRouterDB }
import { Router } from "express";
import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
import { CartController } from "../controller/cart.controller.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router();
const cartManagerDB = new CartManagerDB();

router.get('/', CartController.getCarts)

router.get('/:cid', CartController.getCartById)

router.post('/', CartController.saveCart)

router.post('/:cid/product/:pid', checkRole(["user", "premium", "admin"]),CartController.saveProductInCart)

router.delete('/:cid/product/:pid', checkRole(["user", "admin", "premium"]),CartController.deleteProductInCart);

router.put('/:cid', CartController.saveManyProductInCart);

router.put('/:cid/product/:pid', checkRole(["user"]),CartController.updateProductInCart);

router.delete('/:cid', CartController.emptyCart);

router.post("/:cid/purchase", CartController.purchase);


export { router as cartRouterDB}
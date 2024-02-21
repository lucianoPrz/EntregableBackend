import { Router } from "express";
import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
import { CartController } from "../controller/cart.controller.js";

const router = Router();
const cartManagerDB = new CartManagerDB();

router.get('/', CartController.getCarts)

router.get('/:cid', CartController.getCartById)

router.post('/', CartController.saveCart)

router.post('/:cid/product/:pid', CartController.saveProductInCart)

router.delete('/:cid/product/:pid', CartController.deleteProductInCart);

router.put('/:cid', CartController.saveManyProductInCart);

router.put('/:cid/product/:pid', CartController.updateProductInCart);

router.delete('/:cid', CartController.emptyCart);


export { router as cartRouterDB}
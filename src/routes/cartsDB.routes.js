import { Router } from "express";
import { CartManagerDB } from "../dao/DBManagers/CartManagerDB.js";
import cartModel from "../dao/models/cart.model.js";

const router = Router();
const cartManagerDB = new CartManagerDB();

router.get('/', async(req, res) => {

    const carts = await cartManagerDB.getCart()
    res.send({
        status: 'success',
        message: carts
    })
})

router.get('/:cid', async(req, res) => {
    
    const cid = req.params.cid
    const cart = await cartManagerDB.getCartsById(cid)
  

    if (!cart) {
        return res.status(400).send({ 
            status: 'error',
            error: 'No existe el carrito'
         })
    } else {
        res.send({
            status: 'success',
            message: cart
        })
    }

    
})

router.post('/', async(req, res) => {
    const cart = await cartManagerDB.createCart()

    res.send({
        status: 'success',
        msg: cart
    })
})

router.post('/:cid/product/:pid', async(req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    const quantity = req.params.quantity
    
    const cart = await cartManagerDB.addProductInCart(pid, cid, quantity)
})

export { router as cartRouterDB}
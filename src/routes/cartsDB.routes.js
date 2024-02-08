import { Router } from "express";
import { CartManagerDB } from "../dao/DBManagers/CartManagerDB.js";
import { CartController } from "../controller/cart.controller.js";

const router = Router();
const cartManagerDB = new CartManagerDB();

router.get('/', CartController.getCarts)

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
    
    const result = await cartManagerDB.addProductInCart(pid, cid, quantity)

    res.send({
        status: 'success',
        msg: result
    })
})

router.delete('/:cid/product/:pid', async(req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    const quantity = req.params.quantity
    
    const result = await cartManagerDB.deleteProdInCart(pid, cid, quantity)

    res.send({
        status: 'success',
        msg: result
    })
});

router.put('/:cid', async(req, res) => {
    const pid = req.params.pid
    const products = req.body
    
    const result = await cartManagerDB.addManyProductsInCart(cid, products)

    res.send({
        status: 'success',
        msg: result
    })
});

router.put('/:cid/product/:pid', async(req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid
    const quantity = req.body.quantity
    
    const result = await cartManagerDB.updateProductInCart(pid, cid, quantity)

    res.send({
        status: 'success',
        msg: result
    })
});

router.delete('/:cid', async(req, res) => {
    const pid = req.params.pid
    
    const result = await cartManagerDB.emptyCart(cid)

    res.send({
        status: 'success',
        msg: result
    })
});


export { router as cartRouterDB}
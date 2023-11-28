import { Router } from "express";
import { CartManagerFile} from "../managers/CartManagerFile.js";

const path = 'carts.json'
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get('/', async(req, res) => {
    const carts = await cartManagerFile.getCarts();
    res.send({
        status: 'success',
        carritos: carts
    })
})

router.get('/:cid', async(req, res) => {
    const carts = await cartManagerFile.getCarts();
    const cid = parseInt(req.params.cid)

    const cart = carts.find(cart => cart.id === cid)

    if (!cart) {
        return res.send({ 
            status: 'error',
            error: 'No existe el carrito'
         })
    } else {
        res.send({
            status: 'success',
            carrito: cart
        })
    }

    
})

router.post('/', async(req, res) => {
    const cart = req.body;
    const carts = await cartManagerFile.addCart(cart);
    res.send({
        status: 'success',
        msg: `Carrito creado`,
        carritos: carts
    })
})

router.post('/:cid/product/:pid', async(req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid

    res.send({
        status: 'success',
        msg: `Ruta POST CART - AGREGO producto ${pid} al carrito ${cid}`
    })
})


router.delete('/:cid', async(req, res) => {
    const cid = req.params.cid
    res.send({
        status: 'success',
        msg: `Ruta DELETE ID: ${cid} CART`
    })
})

export { router as cartRouter}
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
    const cid = req.params.cid

    res.send({
        status: 'success',
        msg: `Ruta GETID con ID: ${cid} CART`
    })
})

router.post('/', async(req, res) => {
    res.send({
        status: 'success',
        msg: `Ruta POST CART`
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

router.put('/:cid', async(req, res) => {
    const cid = req.params.cid
    res.send({
        status: 'success',
        msg: `Ruta PUT ID: ${cid} CART`
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
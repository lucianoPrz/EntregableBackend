import { Router } from "express";
import { CartManagerFile} from "../dao/managers/CartManagerFile.js";
import cartModel from "../dao/models/cart.model.js";

const path = 'carts.json'
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get('/', async(req, res) => {
    //const carts = await cartManagerFile.getCarts();
    const carts = await cartModel.find();
    res.send({
        status: 'success',
        message: carts
    })
})

router.get('/:cid', async(req, res) => {
    //const carts = await cartManagerFile.getCarts();
    const cid = req.params.cid
    const cart = await cartModel.find({_id: cid});
    //const cart = carts.find(cart => cart.id === cid)

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
    const {products} = req.body;
    
    if(!products || Array.isArray(!products)){
        return res.status(400).send({
            status: 'error',
            message: "valores incorrectos"
        })
    }

    const cart = {
        products
    }

    //const carts = await cartManagerFile.addCart(cart);
    const result = await cartModel.create(cart)
    res.send({
        status: 'success',
        message: result
    })
})

router.post('/:cid/product/:pid', async(req, res) => {
    const pid = req.params.pid
    const cid = req.params.cid

    //const carts = await cartManagerFile.updateCart(cid, pid)
    const cart = await cartModel.find({_id: cid});

    if (!cart) {
        return res.status(400).send({ 
            status: 'error',
            error: 'No existe el carrito'
         })
    }
    console.log(cart[0].products)
    const indexProdEnCart = cart[0].products.findIndex(product => product.id === pid)
    if(indexProdEnCart !== -1){
        cart.products[indexProdEnCart].quantity ++;
    } else {
        const product = {
            id : pid,
            quantity : 1 
        }
        cart[0].products.push(product)
    }

    const result = cartModel.updateOne({_id: cid},{$set: cart})

    res.send({
        status: "success",
        message: result
    })

    // if (carts === "Not found") {
    //     return res.send({ 
    //         status: 'error',
    //         error: 'No existe el carrito'
    //      })
    //     } else {
    //         res.send({
    //             status: 'success',
    //             msg: `Carrito actualizado`,
    //             carrito: carts
    //         })

    //     }

})

export { router as cartRouter}
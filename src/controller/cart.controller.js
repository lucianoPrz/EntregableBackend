import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
const cartManagerDB = new CartManagerDB();

class CartController {
    static getCarts = async(req, res) => {

        const carts = await cartManagerDB.getCarts()
        res.send({
            status: 'success',
            message: carts
        })
    }

    static getCartById = async(req, res) => {
    
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
    
        
    }

    static saveCart = async(req, res) => {
        const cart = await cartManagerDB.createCart()
    
        res.send({
            status: 'success',
            msg: cart
        })
    }

    static saveProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.params.quantity
        
        const result = await cartManagerDB.addProductInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static deleteProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.params.quantity
        
        const result = await cartManagerDB.deleteProdInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static saveManyProductInCart = async(req, res) => {
        const cid = req.params.cid
        const products = req.body
        
        const result = await cartManagerDB.addManyProductsInCart(cid, products)
    
        res.send({
            status: 'success',
            msg: result
        })
    }
    
    static updateProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.body.quantity
        
        const result = await cartManagerDB.updateProductInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static emptyCart = async(req, res) => {
        const cid = req.params.cid
        
        const result = await cartManagerDB.emptyCart(cid)
    
        res.send({
            status: 'success',
            msg: result
        })
    }
}

export { CartController }
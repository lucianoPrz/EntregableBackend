import { cartService, productService, ticketService } from "../repository/index.js";
import { v4 as uuidv4 } from "uuid";

class CartController {
    static getCarts = async (req, res) => {
        try {
            const carts = await cartService.getCarts()
            res.send({
                status: 'success',
                payload: carts
            })
        } catch (error) {
            req.logger.error(error.message);
        }

    }

    static getCartById = async (req, res) => {
        try {
            const cid = req.params.cid
        const cart = await cartService.getCartsById(cid)


        if (!cart) {
            req.logger.error('Cart not found')
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
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }
        


    }

    static saveCart = async (req, res) => {
        try {
            const cart = await cartService.createCart()

            res.send({
                status: 'success',
                msg: cart
            })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }
       
    }

    static saveProductInCart = async (req, res) => {

        try {
            const pid = req.params.pid
        const cid = req.params.cid
        const quantity = 1

        const result = await cartService.addProductInCart(pid, cid, quantity)

        res.send({
            status: 'success',
            msg: result
        })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }

        
    }

    static deleteProductInCart = async (req, res) => {

        try {
            const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.params.quantity

        const result = await cartService.deleteProdInCart(pid, cid, quantity)

        res.send({
            status: 'success',
            msg: result
        })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }

        
    }

    static saveManyProductInCart = async (req, res) => {

        try {
            const cid = req.params.cid
        const products = req.body

        const result = await cartService.addManyProductsInCart(cid, products)

        res.send({
            status: 'success',
            msg: result
        })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }

        
    }

    static updateProductInCart = async (req, res) => {

        try {
            const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.body.quantity

        const result = await cartService.updateProductInCart(pid, cid, quantity)

        res.send({
            status: 'success',
            msg: result
        })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }

        
    }

    static emptyCart = async (req, res) => {

        try {
            const cid = req.params.cid

        const result = await cartService.emptyCart(cid)

        res.send({
            status: 'success',
            msg: result
        })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }

        
    }

    static purchase = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const email = req.body.email;
            const cartDB = await cartService.getCartsById(cartId);
            const cart = cartDB[0]
            if (cart) {
                if (!cart.products.length) {
                    return res.send("es necesario que agrege productos antes de realizar la compra")
                }
                const ticketProducts = [];
                const rejectedProducts = [];
                for (let i = 0; i < cart.products.length; i++) {
                    const cartProduct = cart.products[i];
                    console.log(cartProduct.product._id);
                    const productDB = await productService.getProductById(cartProduct.product._id);
                    console.log(productDB);
                    //comparar la cantidad de ese producto en el carrito con el stock del producto
                    if (cartProduct.quantity <= productDB.stock) {
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                }
                // console.log("ticketProducts", ticketProducts)
                // console.log("rejectedProducts", rejectedProducts)
                const newTicket = {
                    code: uuidv4(),
                    purchase_datetime: new Date().toLocaleString(),
                    amount: 500,
                    purchaser: email
                }
                const ticketCreated = await ticketService.createTicket(newTicket);
                cartService.emptyCart(cartId)
                res.send(ticketCreated)
            } else {
                res.send("el carrito no existe")
            }
        } catch (error) {
            console.log(error.message);
            req.logger.error(error.message)
            res.send(error.message)
        }
    }
}

export { CartController }
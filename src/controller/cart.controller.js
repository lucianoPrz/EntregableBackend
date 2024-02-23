import { cartService, productService, ticketService } from "../repository/index.js";

class CartController {
    static getCarts = async(req, res) => {

        const carts = await cartService.getCarts()
        res.send({
            status: 'success',
            message: carts
        })
    }

    static getCartById = async(req, res) => {
    
        const cid = req.params.cid
        const cart = await cartService.getCartsById(cid)
      
    
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
        const cart = await cartService.createCart()
    
        res.send({
            status: 'success',
            msg: cart
        })
    }

    static saveProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.params.quantity
        
        const result = await cartService.addProductInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static deleteProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.params.quantity
        
        const result = await cartService.deleteProdInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static saveManyProductInCart = async(req, res) => {
        const cid = req.params.cid
        const products = req.body
        
        const result = await cartService.addManyProductsInCart(cid, products)
    
        res.send({
            status: 'success',
            msg: result
        })
    }
    
    static updateProductInCart = async(req, res) => {
        const pid = req.params.pid
        const cid = req.params.cid
        const quantity = req.body.quantity
        
        const result = await cartService.updateProductInCart(pid, cid, quantity)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static emptyCart = async(req, res) => {
        const cid = req.params.cid
        
        const result = await cartService.emptyCart(cid)
    
        res.send({
            status: 'success',
            msg: result
        })
    }

    static purchase = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const email = req.body.email;
            const cart = await cartService.getCartsById(cartId);
            if(cart){
                if(!cart.products.length){
                    return res.send("es necesario que agrege productos antes de realizar la compra")
                }
                const ticketProducts = [];
                const rejectedProducts = [];
                for(let i=0; i<cart.products.length;i++){
                    const cartProduct = cart.products[i];
                    const productDB = await productService.getProductById(cartProduct.id);
                    //comparar la cantidad de ese producto en el carrito con el stock del producto
                    if(cartProduct.quantity<=productDB.stock){
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                }
                console.log("ticketProducts",ticketProducts)
                console.log("rejectedProducts",rejectedProducts)
                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date().toLocaleString(),
                    amount:500,
                    purchaser: req.user.email
                }
                const ticketCreated = await ticketService.createTicket(newTicket);
                res.send(ticketCreated)
            } else {
                res.send("el carrito no existe")
            }
        } catch (error) {
            res.send(error.message)
        }
    }
}

export { CartController }
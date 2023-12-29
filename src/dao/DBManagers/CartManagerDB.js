import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartManagerDB {
   

    getCarts = async () => {
       const carts = await cartModel.find()
       return carts
    }

    getCartsById = async (cid) => {
        const cart = await cartModel.find({_id: cid})

        return cart
    }

    createCart = async () => {
        const cart = await cartModel.create({})

        return cart
    }

    addProductInCart = async (pid, cid, quantity = 1) => {
        console.log("antes de cart")
        const cart = await cartModel.findOne({_id: cid});
        console.log(cart)
        if (!cart) {
            console.log(!cart)
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            };
        }
    
        const product = await productModel.findOne({ _id: pid });
        if (!product) {
            return {
                status: 'error',
                msg: `El producto ${pid} no existe`
            };
        }
    
        let productsInCart = cart.products;
        const indexProduct = productsInCart.findIndex(product => product.product == pid);
    
        if (indexProduct == -1) {
            const newProduct = {
                product: pid,
                quantity: quantity 
            };
            cart.products.push(newProduct);
        } else {
            console.log("else")
            cart.products[indexProduct].quantity += quantity;
        }
        
        await cart.save();
        console.log("save product")
    
        return cart
    };
    
}



export { CartManagerDB };
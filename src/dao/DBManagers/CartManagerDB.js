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

    addProductInCart = async (cid,pid, quantity = 1) => {
        const cart = await this.getCartsById(cid);
        if(!cart){
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            }
        }
        const product = productModel.findOne({_id: pid})
        if(!product){
            return {
                status: 'error',
                msg: `El producto ${pid} no existe`
            }
        }
        let productsInCart = cart.products;
         const indexProduct = productsInCart.findIndex(product=>product.product == pid)

         if(indexProduct == -1){
             const newProduct = {
                 product: pid,
                 quanity: quantity
             }
             cart.products.push(newProduct)
         }else {
            cart.products[indexProduct].quantity += quantity
         }

        await cart.save();

        return {
            status: 'success',
            msg: 'El producto se agrego correctamente'
        }

        
    }
}



export { CartManagerDB };
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartManagerDB {
   

    getCarts = async () => {
       const carts = await cartModel.find()
       return carts
    }

    getCartsById = async (cid) => {
        const cart = await cartModel.find({_id: cid}).lean(true)

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

    deleteProdInCart = async (pid, cid, quantity = 1) => {
        const cart = await cartModel.findOne({_id: cid});
        console.log(cart)
        if (!cart) {
            console.log(!cart)
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            };
        }

        const indexProdInCart = cart.products.findIndex(prod => prod.product == pid);
        if (indexProdInCart == -1) {
            return {
                status: 'error',
                msg: `El producto ${pid} no existe el carrito ${cid}`
            }
        }else {
            cart.products.splice(indexProdInCart, 1);
        }

        await cart.save();

        return cart
    };

    addManyProductsInCart = async (cid, products) => {
        const cart = await cartModel.findOne({_id: cid});
        console.log(cart)
        if (!cart) {
            console.log(!cart)
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            };
        }
        let productsInCart = cart.products;
        for (const prod of products) {
            const indexProduct = productsInCart.findIndex(product => product.product._id == prod._id);
        
            if (indexProduct == -1) {
                const newProduct = {
                    product: prod._id,
                    quantity: 1 
                };
                cart.products.push(newProduct);
            } else {
                console.log("else")
                cart.products[indexProduct].quantity++;
            }
        }

        await cart.save();

        return cart
    };

    updateProductInCart = async(pid, cid, quantity) => {
        const cart = await cartModel.findOne({_id: cid});
        console.log(cart)
        if (!cart) {
            console.log(!cart)
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            };
        }

        let productsInCart = cart.products;
        const indexProduct = productsInCart.findIndex(product => product.product == pid);
    
        if (indexProduct == -1) {
            return {
                status: 'error',
                msg: `El producto ${pid} no existe en el carrito ${cid}`
            };
        } else {
            cart.products[indexProduct].quantity += quantity;
        }
        
        await cart.save();
    
        return cart
    };

    emptyCart = async(cid) => {
        const cart = await cartModel.findOne({_id: cid});
        console.log(cart)
        if (!cart) {
            console.log(!cart)
            return {
                status: 'error',
                msg: `El carrito ${cid} no existe`
            };
        }

        cart.products = [];

        await cart.save();

        return cart;
    };
}



export { CartManagerDB };
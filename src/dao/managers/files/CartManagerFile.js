import fs from 'fs';
import path from 'path';
import __dirname from '../../../utils.js';

class CartManagerFile {
    constructor(pathFile) {
        this.path = path.join(__dirname, `/files/${pathFile}`);
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)
            return carts
        } else {
            return []
        }
    }

    getCartsById = async (idCart) => {
        const carts = await this.getCarts()

        const cartExistente = carts.find(carts => carts.id === idCart)
        if (cartExistente) {
            return cartExistente
        } else {
            return "Not found";
        }
    }

    addCart = async (cart) => {
        const carts = await this.getCarts();

        if (!Array.isArray(cart.products)){
            return "el campo product debe ser array"
        }

        if(carts.length === 0){
            cart.id=1;
        } else {
            cart.id = carts[carts.length-1].id+1;
        }

        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

        return carts;
    }

    updateCart = async (cartId, prodId) => {
        const cart = await this.getCartsById(cartId);

        if(!cart){
            return "Not found"
        }
        
        const carts = await this.getCarts();

        const indexProdEnCart = carts[cartId-1].products.findIndex(product => product.id === prodId)

        if (indexProdEnCart !== -1) {
            carts[cart.id-1].products[indexProdEnCart].quantity ++;
        } else {
            const product = {
                id : prodId,
                quantity: 1
            }
            carts[cart.id-1].products.push(product);
        }

        
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))

        return carts;
    }
}



export { CartManagerFile };
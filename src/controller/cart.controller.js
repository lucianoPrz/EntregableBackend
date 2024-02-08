import { CartManagerDB } from "../dao/DBManagers/CartManagerDB.js";

const cartManagerDB = new CartManagerDB();

class CartController {
    static getCarts = async(req, res) => {

        const carts = await cartManagerDB.getCarts()
        res.send({
            status: 'success',
            message: carts
        })
    }
}

export { CartController }
import { Router} from "express";

import { ProductManagerDB } from "../dao/DBManagers/ProductManagerDB.js";
import { CartManagerDB } from "../dao/DBManagers/CartManagerDB.js";

import productModel from "../dao/models/product.model.js";
import messageModel from "../dao/models/message.model.js";

const router = Router();
const productManagerDB = new ProductManagerDB();
const cartManagerDB = new CartManagerDB();

router.get('/', async (req, res) => {
    const products = await productManagerDB.getProducts();
   // console.log(products)

    res.render('home', { products: products});
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManagerDB.getProducts();

    res.render('realTimeProducts', { products: products.docs});
})

router.get('/chat', async (req, res) => {
    res.render('chat', { })
})

router.get('/products', async (req, res) => {
    try {

        let { limit, page, sort, category, price } = req.query
        const options = {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: {price: sort === "asc" ? 1 : -1},
            
        }

        const products = await productManagerDB.getProducts(options);

        if(products.hasPrevPage){
            products.prevLink = `/products?page=${products.prevPage}` ;
        }
        if(products.hasNextPage){
            products.nextLink = `/products?page=${products.nextPage}`;
        }

        res.render('products', {products, user: req.session.user})
    
        
    } catch (error) {
        console.log(error)
    }
});

router.get('/cart/:cid', async (req, res) => {
    const cid = req.params.cid;

    const cart = await cartManagerDB.getCartsById(cid);

    const products = cart[0].products
    console.log(products)


    res.render('carts', {products})

});

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

export { router as viewRouterDB}
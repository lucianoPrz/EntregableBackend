import { Router} from "express";
import { ProductManagerDB } from "../dao/DBManagers/ProductManagerDB.js";
import productModel from "../dao/models/product.model.js";
import messageModel from "../dao/models/message.model.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

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

        res.render('products', {products})
    
        
    } catch (error) {
        console.log(error)
    }
});

export { router as viewRouterDB}
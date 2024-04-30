import { Router} from "express";

import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";
import { CartManagerDB } from "../dao/managers/mongo/CartManagerDB.js";
import User from "../dao/managers/mongo/UserManagerDB.js";
import { checkRole, verifyEmailTokenMW } from "../middlewares/auth.js";


import productModel from "../dao/models/product.model.js";
import messageModel from "../dao/models/message.model.js";
import { userService } from "../repository/index.js";

const router = Router();
const productManagerDB = new ProductManagerDB();
const cartManagerDB = new CartManagerDB();
const userManagerDB = new User()

const publicAccess = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/')
    }
    next();
};

const privateAccess = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login')
    }
    next();
};


router.get('/realtimeproducts', async (req, res) => {
    const products = await productManagerDB.getProducts();

    res.render('realTimeProducts', { products: products.docs});
})

router.get('/chat', checkRole(["user"]),async (req, res) => {
    res.render('chat', { })
})

router.get('/', privateAccess,async (req, res) => {
    try {

        let { limit, page, sort, category, price } = req.query
        const options = {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: {price: sort === "asc" ? 1 : -1},
            
        }

        const products = await productManagerDB.getProducts(options);

        if(products.hasPrevPage){
            products.prevLink = `/?page=${products.prevPage}` ;
        }
        if(products.hasNextPage){
            products.nextLink = `/?page=${products.nextPage}`;
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

router.get('/register', publicAccess,(req, res) => {
    res.render('register')
})

router.get('/login', publicAccess,(req, res) => {
    res.render('login')
})

router.get("/forgot-password", (req,res)=>{
    res.render("forgotPassword")
})

router.get("/reset-password", verifyEmailTokenMW(), (req,res)=>{
    const token = req.query.token;
    res.render("resetPassword",{token})
})

router.get("/userFind", checkRole(["admin"]), (req,res)=>{
    res.render("userFind")
})

router.get('/users/:uid', checkRole(["admin"]), async (req, res) => {
    const uid = req.params.uid; // Utiliza req.params.uid para obtener el valor del parámetro de la URL
    console.log("VIEWDDD");
    console.log(uid);
    let usuario = await userService.getBy({_id: uid});
    console.log(usuario);

    res.render('userView', {usuario});
});


export { router as viewRouterDB}
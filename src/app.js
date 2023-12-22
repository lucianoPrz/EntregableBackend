import express from 'express';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars'
import __dirname from './utils.js';
import { Server } from 'socket.io';


import { cartRouterDB } from './routes/cartsDB.routes.js';
import { productRouterDB } from './routes/productsDB.routes.js';
import { viewRouterDB } from './routes/viewsDB.routes.js';

import { ProductManagerFile } from "./dao/managers/ProductManagerFile.js";
import productModel from './dao/models/product.model.js';


const PORT = 8080
const productManagerFile = new ProductManagerFile('products.json')
const app = express();

const MONGO = "mongodb+srv://slperez:UGmmSbut0hsLmWUK@cluster0.6bqcjjp.mongodb.net/ecommerce"

const connection = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const getProductos = async() => {
    const productos = await productManagerFile.getProducts();
    return productos
};
let productos =[]

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})

const socketServer = new Server(httpServer)

app.engine("handlebars", engine())
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`)



app.use('/api/products', productRouterDB)
app.use('/api/carts', cartRouterDB)
app.use('/', viewRouterDB)

socketServer.on('connection', async(socket) => {
    console.log(`Nuevo cliente conectado`)

    socket.on("addProduct", async(data)=>{

        // productos = [...productos, data];
        await productModel.create(data)
        const productos = await productModel.find()

        socketServer.emit("products-update", productos)
    })

    socket.on('deleteProduct', async(dataId)=>{
        await productModel.deleteOne({_id: dataId})
        const productosRestantes = await productModel.find()
        // if (productosRestantes !== "Not found"){
        socketServer.emit("products-update", productosRestantes)
        // } else {
        //     console.log('Id not found')
        // }
    })
 
})

































// app.get('/products', async (req, res)=>{
    
//     let products = await manager.getProducts();
//     let limit = parseInt(req.query.limit)

//     if(!limit || limit > products.length){
//         res.json({products})
//     } else {
//         let productsLimit = products.slice(0, limit)
//         res.json({products: productsLimit})
//     }
// })

// app.get('/products/:id', async (req, res)=>{
//     const products = await manager.getProducts();

//     const idProduct = parseInt(req.params.id)

//     const producto = products.find(prod => prod.id === idProduct)

//     if (!producto) {
//         return res.send({error: 'Not Found'}) 
//     }
//     res.json({producto: producto})
// })



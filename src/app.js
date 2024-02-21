import express from 'express';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars'
import __dirname from './utils.js';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { options } from './config/config.js';
import { connectDB } from './config/dbConnection.js';

import { cartRouterDB } from './routes/cartsDB.routes.js';
import { productRouterDB } from './routes/productsDB.routes.js';
import { viewRouterDB } from './routes/viewsDB.routes.js';
import sessionRouter from './routes/sessions.routes.js'
import inicializePassport from './config/passport.config.js';


import productModel from './dao/models/product.model.js';
import messageModel from './dao/models/message.model.js';


const PORT = options.server.port;

const app = express();

const MONGO = options.mongo.url

// const connection = mongoose.connect(MONGO);

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600
    }),
    secret: options.mongo.secret,
    resave: false,
    saveUninitialized: false
}))

inicializePassport()
app.use(passport.initialize())
app.use(passport.session())


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
app.use('/api/sessions', sessionRouter)

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
        socketServer.emit("products-update", productosRestantes)
        
    })

    socket.on('chat-messages', async(data)=>{
        const newMessage = {
            user: socket.id,
            message: data
        }
        await messageModel.create(newMessage)
        const mensajes = await messageModel.find()

        socketServer.emit("chat-messages-update", mensajes)
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



import express from 'express';
import {engine} from 'express-handlebars'
import __dirname from './utils.js';
import { Server } from 'socket.io';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { viewRouter } from './routes/views.routes.js';

const PORT = 8080

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})

const socketServer = new Server(httpServer)

app.engine("handlebars", engine())
app.set('view engine', 'handlebars');
app.set("views", `${__dirname}/views`)



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewRouter)

































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



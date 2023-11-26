import express from 'express';
import ProductManager from './managers/ProductManager.js';

const PORT = 8080

const app = express();

app.use(express.urlencoded({ extended: true }))

const path = './src/files/products.json';

const manager = new ProductManager(path)

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})

app.get('/products', async (req, res)=>{
    
    let products = await manager.getProducts();
    let limit = parseInt(req.query.limit)

    if(!limit || limit > products.length){
        res.json({products})
    } else {
        let productsLimit = products.slice(0, limit)
        res.json({products: productsLimit})
    }
})

app.get('/products/:id', async (req, res)=>{
    const products = await manager.getProducts();

    const idProduct = parseInt(req.params.id)

    const producto = products.find(prod => prod.id === idProduct)

    if (!producto) {
        return res.send({error: 'Not Found'}) 
    }
    res.json({producto: producto})
})

 



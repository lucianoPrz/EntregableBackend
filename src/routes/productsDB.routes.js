import { Router } from "express";
import { ProductManagerFile } from "../dao/managers/ProductManagerFile.js";
import productModel from "../dao/models/product.model.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    //let products = await productManagerFile.getProducts();
    let products = await productModel.find();
    let limit = parseInt(req.query.limit)

    if (!limit || limit > products.length) {
        res.json({
            status: 'success',
            productos: products
        })
    } else {
        let productsLimit = products.slice(0, limit)
        res.json({
            status: 'success',
            productos: productsLimit
        })
    }
})

router.get('/:pid', async (req, res) => {
    //const products = await productManagerFile.getProducts();
    const pid = req.params.pid
    let producto = await productModel.find({_id: pid});

    //const producto = products.find(prod => prod.id === pid)

    if (!producto) {
        return res.status(400).send({ 
            status: 'error',
            error: 'No existe el producto' 
        })
    }
    res.send({ 
        status: 'success',
        producto: producto
     })
})

router.post('/', async (req, res) => {
    //const product = req.body;
    //const products = await productManagerFile.addProduct(product)
    const {title, description,code, price,  status, stock, category, thumbnail} = req.body

    if(!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).send({
            status: 'error',
            message: "Valores incompletos"
        })
    }
    const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
    }
    const result = await productModel.create(product)

    res.send({
        status: 'success',
        message: result
    })
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    //const existeProducto = await productManagerFile.getProductById(pid)

    

    // if (existeProducto === "Not found") {
    //     return res.send({
    //         status: 'error',
    //         msg: `Producto inexistente`
    //     })
    // }

    const {title, description,code, price,  status, stock, category, thumbnail} = req.body

    const productoActualizado = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail
    }

    const result = await productModel.updateOne({_id: pid},{$set: productoActualizado})

    //const productsUpdate = await productManagerFile.updateProduct(pid, productoActualizado)

    res.send({
        status: 'success',
        msg: `Producto actualizado`,
        productos: result
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    //const existeProducto = await productManagerFile.getProductById(pid)
    const result = await productModel.deleteOne({_id: pid})

    // if (existeProducto === "Not found") {
    //     return res.send({
    //         status: 'error',
    //         msg: `Producto inexistente`
    //     })
    // }

    //const productsDelete = await productManagerFile.deleteProduct(pid)

    res.send({
        status: 'success',
        message: result
    })
})

export { router as productRouterDB }
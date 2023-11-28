import { Router } from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    let products = await productManagerFile.getProducts();
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
    const products = await productManagerFile.getProducts();

    const pid = parseInt(req.params.pid)

    const producto = products.find(prod => prod.id === pid)

    if (!producto) {
        return res.send({ 
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
    const product = req.body;
    const products = await productManagerFile.addProduct(product)
    res.send({
        status: 'success',
        msg: `Producto creado`,
        productos: products
    })
})

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const existeProducto = await productManagerFile.getProductById(pid)

    if (existeProducto === "Not found") {
        return res.send({
            status: 'error',
            msg: `Producto inexistente`
        })
    }

    const productoActualizado = req.body
    const productsUpdate = await productManagerFile.updateProduct(pid, productoActualizado)

    res.send({
        status: 'success',
        msg: `Producto actualizado`,
        productos: productsUpdate
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const existeProducto = await productManagerFile.getProductById(pid)

    if (existeProducto === "Not found") {
        return res.send({
            status: 'error',
            msg: `Producto inexistente`
        })
    }

    const productsDelete = await productManagerFile.deleteProduct(pid)

    res.send({
        status: 'success',
        msg: `Producto eliminado`,
        productos: productsDelete
    })
})

export { router as productRouter }
import { Router } from "express";
import { ProductManagerFile} from "../managers/ProductManagerFile.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async(req, res) => {
    let products = await productManagerFile.getProducts();
    let limit = parseInt(req.query.limit)

    if(!limit || limit > products.length){
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

router.get('/:pid', async(req, res) => {
    const products = await productManagerFile.getProducts();

    const pid = parseInt(req.params.pid)

    const producto = products.find(prod => prod.id === pid)

    if (!producto) {
        return res.send({error: 'Not Found'}) 
    }
    res.json({producto: producto})
})

router.post('/', async(req, res) => {
    const product = req.body;
    const products = await productManagerFile.addProduct(product)
    res.send({
        status: 'success',
        msg: `Producto creado`,
        productos: products
    })
})

router.put('/:pid', async(req, res) => {
    const pid = req.params.pid
    res.send({
        status: 'success',
        msg: `Ruta PUT ID: ${pid} PRODUCT`
    })
})

router.delete('/:pid', async(req, res) => {
    const pid = req.params.pid
    res.send({
        status: 'success',
        msg: `Ruta DELETE ID: ${pid} PRODUCT`
    })
})

export { router as productRouter}
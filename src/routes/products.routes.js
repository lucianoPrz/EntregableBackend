import { Router } from "express";
import { ProductManagerFile} from "../managers/ProductManagerFile.js";

const path = 'products.json'
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async(req, res) => {
    res.send({
        status: 'success',
        msg: `Ruta GET PRODUCT`
    })
})

router.get('/:pid', async(req, res) => {
    const pid = req.params.pid

    res.send({
        status: 'success',
        msg: `Ruta GETID ${pid} PRODUCT`
    })
})

router.post('/', async(req, res) => {
    
    res.send({
        status: 'success',
        msg: `Ruta POST PRODUCT`
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
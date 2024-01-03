import { Router } from "express";
import { ProductManagerDB } from "../dao/DBManagers/ProductManagerDB.js";
import productModel from "../dao/models/product.model.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

router.get('/', async (req, res) => {
   
    try {

        const { limit, page, sort, category, price } = req.query
        const options = {
            category: category ?? "",
            limit: limit  ?? 10,
            page: page ?? 1,
            sort: {price: sort === "asc" ? 1 : -1},
            lean: true
        }

        const products = await productManagerDB.getProducts(options);

        if(products.hasPrevPage){
            products.prevLink = `/api/products?page=${products.prevPage}` ;
        }
        if(products.hasNextPage){
            products.nextLink = `/api/products?page=${products.nextPage}`;
        }
    
        res.json({
            status: 'success',
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null,
        })
        
    } catch (error) {
        console.log(error)
    }

})

router.get('/:pid', async (req, res) => {
    //const products = await productManagerFile.getProducts();
    const pid = req.params.pid
    let producto = await productManagerDB.getProductById(pid);

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
    const { title, description, code, price, status, stock, category, thumbnail } = req.body

    if (!title || !description || !code || !price || !status || !stock || !category) {
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
    const result = await productManagerDB.addProduct(product)

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

    const { title, description, code, price, status, stock, category, thumbnail } = req.body

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

    const result = await productManagerDB.updateProduct(pid, productoActualizado)

    //const productsUpdate = await productManagerFile.updateProduct(pid, productoActualizado)

    res.send({
        status: 'success',
        msg: `Producto actualizado`,
        productos: result
    })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const result = await productManagerDB.deleteProduct(pid)

    res.send({
        status: 'success',
        message: result
    })
})

export { router as productRouterDB }
import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";
import { productService } from "../repository/index.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo } from "../services/productErrorInfo.js";
import { generateProductErrorParam } from "../services/productErrorParam.js";

class ProductController {
    static getProducts = async (req, res) => {

        try {

            const { limit, page, sort, category, price } = req.query
            const options = {
                category: category ?? "",
                limit: limit ?? 10,
                page: page ?? 1,
                sort: { price: sort === "asc" ? 1 : -1 },
                lean: true
            }

            const products = await productService.getProducts(options);

            if (products.hasPrevPage) {
                products.prevLink = `/api/products?page=${products.prevPage}`;
            }
            if (products.hasNextPage) {
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
            req.logger.error(error.message)
            res.send(error.message)
        }

    }

    static getProductById = async (req, res) => {
        //const products = await productManagerFile.getProducts();
        const pid = req.params.pid

        let producto = await productService.getProductById(pid);

        //const producto = products.find(prod => prod.id === pid)

        if (!producto) {
            req.logger.warning('Product not found');
            return res.status(400).send({
                status: 'error',
                error: 'No existe el producto'
            })
        }
        res.send({
            status: 'success',
            producto: producto
        })
    }

    static saveProduct = async (req, res) => {

        try {
            const { title, description, code, price, status, stock, category, thumbnail } = req.body

            if (!title || !description || !code || !price || !status || !stock || !category) {
                CustomError.createError({
                    name: "Product create error",
                    cause: generateProductErrorInfo(req.body),
                    message: "Error creando el producto",
                    errorCode: EError.INVALID_PARAM
                });
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
            const result = await productService.addProduct(product)

            res.send({
                status: 'success',
                message: result
            })
        } catch (error) {
            req.logger.error(error.message)
            return res.status(400).send({
                status: 'error',
                error: error.cause,
                code: error.code
            })
        }


    }

    static updateProduct = async (req, res) => {

        try {
            const pid = req.params.pid

            let producto = await productService.getProductById(pid);

            if (!producto) {
                return res.status(400).send({
                    status: 'error',
                    error: 'No existe el producto'
                })
            }

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

            const result = await productService.updateProduct(pid, productoActualizado)


            res.send({
                status: 'success',
                msg: `Producto actualizado`,
                productos: result
            })
        } catch (error) {
            req.logger.error(error.message)
            return res.status(400).send({
                status: 'error',
                error: 'error en put'
            })
        }


    }

    static deleteProduct = async (req, res) => {

        try {
            const pid = req.params.pid
            const result = await productService.deleteProduct(pid)

            let producto = await productService.getProductById(pid);

            if (!producto) {
                req.logger.error('Product not found')
                return res.status(400).send({
                    status: 'error',
                    error: 'No existe el producto'
                })
            }

            res.send({
                status: 'success',
                message: result
            })
        } catch (error) {
            req.logger.error(error.message)
            res.send(error.message)
        }
    }
}

export { ProductController }
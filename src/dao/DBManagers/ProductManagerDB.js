import productModel from "../models/product.model.js"

export default class ProductManagerDB {
    

    // retorna todos los productos registrados
    getProducts = async (options) => {
        const products = await productModel.paginate(
            {
                //filtrado
            },
            {
                options
            }
        );

        return products
    }

    //retorna un producto por el id
    getProductById = async (pid) => {

        const product = await productModel.findOne({_id: pid})

        return product
    }

    // agrega un nuevo producto a this.products
    addProduct = async (product) => {

        const products = await productModel.create(product)

        return products;
    }

    updateProduct = async (productId, product) => {

        const result = await productModel.updateOne({_id: pid},{$set: product})

        return result;
    }

    deleteProduct = async (productId) => {
        
        const result = await productModel.deleteOne({_id: pid})
        return result;
    }
}

export { ProductManagerDB }
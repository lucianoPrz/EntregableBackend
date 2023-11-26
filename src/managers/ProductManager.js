import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // retorna todos los productos registrados
    getProducts = async () => {
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            return products
        } else {
            return []
        }
    }

    //retorna un producto por el id
    getProductById = async (idProduct) => {

        //traigo los productos del file
        const products = await this.getProducts();
        
        //cónsulta si el prod existe
        const productoExistente = products.find(product => product.id === idProduct)
        if (productoExistente) {
            return productoExistente
        } else {
            return "Not found";
        }
    }

    // agrega un nuevo producto a this.products
    addProduct = async (product) => {

        // valida que todos los campos requeridos tengan datos
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return "Todos los datos son obligatorios"
        }
        
        const products = await this.getProducts();


        if(products.length === 0) {
            product.id=1;
        } else {
            product.id = products[products.length-1].id+1;
        }


        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

        return products;
    }

    updateProduct = async (productId, product) => {

        // valida que todos los campos requeridos tengan datos
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return "Todos los datos son obligatorios"
        }
        
        // trae un array con los productos del archivo file
        const products = await this.getProducts();

        // valida si existe un prod con ese id
        const productoExistente = products.find(product => product.id === productId);
        
        // Si el archivo esta vacio o no existe prod con ese id
        if(products.length === 0 || !productoExistente) {
           return 'No existe producto asociado a ese id.'
        } else {
            // se actualiza los campos del objeto
            products[productId-1].title = product.title,
            products[productId-1].description = product.description,
            products[productId-1].price = product.price,
            products[productId-1].thumbnail = product.thumbnail,
            products[productId-1].code = product.code,
            products[productId-1].stock = product.stock
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

        return products;
    }

    deleteProduct = async (productId) => {
        const products = await this.getProducts()
        const productoExistente = products.find(product => product.id === productId);

        if(products.length === 0 || !productoExistente) {
            return `No existe producto con el id ${productId}`
        }

        let productFiltrados = products.filter(product => product.id !== productId)

        await fs.promises.writeFile(this.path, JSON.stringify(productFiltrados, null, '\t'))

        return productFiltrados;
    }
}

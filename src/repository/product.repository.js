export class ProductRepository{
    contructor(dao){
        this.dao = dao;
    };
    async getProducts(options) {
        const products = await this.dao.getProducts(options)
        return products
    }
    async getProductById(id) {
        let product = await this.dao.getProductById(id);
        return product
    }
    async addProduct(product) {
        const products = await this.dao.addProduct(product)
        return products
    }
    async updateProduct(pid, product) {
        const result = await this.dao.updateProduct(pid, product)
        return result
    }
    async deleteProduct(pid){
        let result = await this.dao.deleteProduct(pid);
        return result
    }
}
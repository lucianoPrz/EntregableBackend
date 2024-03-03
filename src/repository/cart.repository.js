export class CartRepository{
    constructor(dao){
        this.dao = dao;
    }
    async getCarts(){
        let carts = this.dao.getCarts();
        return carts
    }
    async getCartsById(cid){
        let cart = this.dao.getCartsById(cid);
        return cart
    }
    async createCart(){
        let cart = this.dao.createCart();
        return cart
    }
    async addProductInCart(pid, cid, quantity){
        let cart = this.dao.addProductInCart(pid, cid, quantity);
        return cart
    }
    async deleteProductInCart(pid, cid){
        let cart = this.dao.deleteProductInCart(pid, cid)
        return cart
    }
    async addManyProductsInCart(cid, products){
        let cart = this.dao.addManyProductsInCart(cid, products);
        return cart
    }
    async updateProductInCart(pid, cid, quantity){
        let cart = this.dao.updateProductInCart(pid, cid, quantity);
        return cart
    }
    async emptyCart(cid){
        let cart = this.dao.emptyCart(cid)
        return cart
    }
}
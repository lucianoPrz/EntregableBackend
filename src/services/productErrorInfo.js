export const generateUserErrorInfo = (product) =>{
    return `
    Algunos campos obligatorios para crear al usuario vinieron vacios:
    title: llego ${product.title},
    code: llego ${product.code},
    price:  llego ${product.price},
    status: llego ${product.status},
    stock: llego ${product.stock},
    category: llego ${product.category},
    `
}
import { UserRepository } from "./user.repository.js";
import User from "../dao/managers/mongo/UserManagerDB.js";
import { CartRepository } from "./cart.repository.js";
import {CartManagerDB } from '../dao/managers/mongo/CartManagerDB.js'
import { ProductRepository } from "./product.repository.js";
import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";

export const userService = new UserRepository(User);
export const cartService = new CartRepository(CartManagerDB);
export const productService = new ProductRepository(ProductManagerDB);
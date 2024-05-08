import { UserRepository } from "./user.repository.js";
import User from "../dao/managers/mongo/UserManagerDB.js";
import { CartRepository } from "./cart.repository.js";
import {CartManagerDB } from '../dao/managers/mongo/CartManagerDB.js'
import { ProductRepository } from "./product.repository.js";
import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";
import { TicketManagerDB } from "../dao/managers/mongo/ticketManagerDB.js";
import { TicketRepository } from "./ticket.repository.js";

let userDao = new User()
let cartDao = new CartManagerDB()
let productDao = new ProductManagerDB()
let ticketDao = new TicketManagerDB()

export const userService = new UserRepository(userDao);
export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const ticketService = new TicketRepository(ticketDao)
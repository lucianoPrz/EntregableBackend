import { UserRepository } from "./user.repository.js";
import User from "../dao/managers/mongo/UserManagerDB.js";
import { CartRepository } from "./cart.repository.js";
import {CartManagerDB } from '../dao/managers/mongo/CartManagerDB.js'
import { ProductRepository } from "./product.repository.js";
import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";
import { TicketManagerDB } from "../dao/managers/mongo/TicketManagerDB.js"
import { TicketRepository } from "./ticket.repository.js";

const userDao = new User()
const cartDao = new CartManagerDB()
const productDao = new ProductManagerDB()
const ticketDao = new TicketManagerDB()

export const userService = new UserRepository(userDao);
export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const ticketService = new TicketRepository(ticketDao)
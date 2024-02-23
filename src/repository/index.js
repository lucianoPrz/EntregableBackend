import { UserRepository } from "./user.repository.js";
import User from "../dao/managers/mongo/UserManagerDB.js";
import { CartRepository } from "./cart.repository.js";
import {CartManagerDB } from '../dao/managers/mongo/CartManagerDB.js'
import { ProductRepository } from "./product.repository.js";
import { ProductManagerDB } from "../dao/managers/mongo/ProductManagerDB.js";
import { TicketManagerDB } from "../dao/managers/mongo/ticketManagerDB.js";
import { TicketRepository } from "./ticket.repository.js";

export const userService = new UserRepository(User);
export const cartService = new CartRepository(CartManagerDB);
export const productService = new ProductRepository(ProductManagerDB);
export const ticketService = new TicketRepository(TicketManagerDB)
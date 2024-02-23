import { ticketsModel } from "../../models/ticket.model.js";

class TicketManagerDB {

    createTicket = async (ticket) =>{
        const ticketCreated = ticketsModel.create(ticket)
        return ticketCreated
    }
}

export { TicketManagerDB }
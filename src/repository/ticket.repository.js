export class TicketRepository {
    constructor(dao){
        this.dao = dao;
    }

    async createTicket(ticket) {
        let ticketCreated = await this.dao.createTicket(ticket);
        return ticketCreated;
    }
}
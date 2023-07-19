export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getTickets = (params) => {
    return this.dao.getTickets(params);
  };

  getTicketBy = (params) => {
    return this.dao.getTicketBy(params);
  };

  createTicket = (ticket) => {
    return this.dao.createTicket(ticket);
  };

  updateTicket = (tid, ticket) => {
    return this.dao.updateTicket(tid, ticket);
  };

  deleteTicket = (tid) => {
    return this.dao.deleteTicket(tid);
  };
}

import ticketModel from "./models/ticket.model.js";

export default class TicketsManager {
  getTickets = (params) => {
    return ticketModel.find(params).lean();
  };

  getTicketBy = ({ params }) => {
    return ticketModel.findOne({ params }).lean();
  };

  createTicket = (ticket) => {
    return ticketModel.create(ticket);
  };

  updateTicket = (tid, ticket) => {
    return ticketModel.findByIdAndUpdate(tid, { $set: ticket });
  };

  deleteTicket = (tid) => {
    return ticketModel.findByIdAndDelete(tid);
  };
}

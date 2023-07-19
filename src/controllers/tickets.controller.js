import { ticketsService } from "../services/repositories.js";

export const getTickets = async (req, res) => {
  try {
    const tickets = await ticketsService.getTickets();
    res.sendSuccessWithPayload(tickets);
  } catch (error) {
    res.sendInternalError("Error interno del servidor");
  }
};

export const getTicketBy = async (req, res) => {
  try {
    const tid = req.params.tid;
    console.log(tid);
    const ticket = await ticketsService.getTicketBy(tid);
    if (ticket) {
      res.sendSuccessWithPayload(ticket);
    } else {
      res.sendBadRequest("Ticket no encontrado, ingrese un ID válido");
    }
  } catch (error) {
    console.log(error);
    res.sendInternalError(error.message);
  }
};

export const createTicket = async (req, res) => {
  try {
    const ticketData = req.body;
    const createdTicket = await ticketsService.createTicket(ticketData);
    res.sendSuccessWithPayload(createdTicket);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Error interno del servidor");
  }
};

export const updateTicket = async (req, res) => {
  try {
    const tid = req.params.tid;
    const ticketData = req.body;
    const updatedTicket = await ticketsService.updateTicket(tid, ticketData);
    res.sendSuccessWithPayload(updatedTicket);
  } catch (error) {
    console.log(error);
    res.sendInternalError("Error interno del servidor");
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const tid = req.params.tid;
    await ticketsService.deleteTicket(tid);
    res.sendSuccess("Ticket eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.sendInternalError("Error interno del servidor");
  }
};

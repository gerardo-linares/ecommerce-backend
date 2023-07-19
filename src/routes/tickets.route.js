import BaseRouter from "./router.js";
import {
  getTickets,
  getTicketBy,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/tickets.controller.js";

export default class TicketRouter extends BaseRouter {
  init() {
    this.get("/", ["SUPERADMIN"], getTickets);
    this.get("/:tid", ["SUPERADMIN"], getTicketBy);
    this.put("/:tid", ["SUPERADMIN"], updateTicket);
    this.delete("/:tid", ["SUPERADMIN"], deleteTicket);
    this.post("/", ["SUPERADMIN"], createTicket);
  }
}

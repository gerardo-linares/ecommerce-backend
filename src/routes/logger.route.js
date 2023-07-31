import BaseRouter from "./router.js";

export default class LoggerRouter extends BaseRouter {
  init() {
    this.get("/loggerTest", ["PUBLIC"], (req, res) => {
      req.logger.fatal("Logger a nivel 'fatal'");
      req.logger.error("Logger a nivel 'error'");
      req.logger.warning("Logger a nivel 'warning'");
      req.logger.info("Logger a nivel 'info'");
      req.logger.http("Logger a nivel 'http'");
      req.logger.debug("Logger a nivel 'debug'");
      res.send("Testing of logger completed successfully");
    });
  }
}

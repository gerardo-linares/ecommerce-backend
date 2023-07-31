export default (error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: "error", error: error.message });
};

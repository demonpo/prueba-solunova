const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  console.log("NOT FOUND HANDLER");
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;

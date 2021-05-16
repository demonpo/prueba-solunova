const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  console.log("LOG ERROR")
  console.log(err);
  return next(err);
}

function wrapErrors(err, req, res, next) {
  console.log("WRAP ERRORS");
  if (!err.isBoom) {
    return next(boom.badImplementation(err));
  }

  return next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  console.log("ERROR HANDLER");
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};

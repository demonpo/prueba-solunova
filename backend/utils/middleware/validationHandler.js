const boom = require('@hapi/boom');
const joi = require('joi');

function validate(data, schema) {
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = 'body') {
  console.log("VALIDATION HANDLER")
  return function(req, res, next) {
    const error = validate(req[check], schema);
    console.log(error);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
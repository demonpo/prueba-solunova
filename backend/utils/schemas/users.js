const joi = require("joi");

const userIdSchema = joi.object({userId: joi.string().regex(/^[0-9a-fA-F]{24}$/)});

const createUserSchema = joi.object({
    name: joi.string().max(100).required(),
    lastName: joi.string().max(100).required(),
    userName: joi.string().max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

module.exports = {
    userIdSchema,
    createUserSchema
}

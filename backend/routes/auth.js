const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const ApiKeysService = require("../services/apiKeys");
const UsersService = require("../services/users");
const validationHandler = require("../utils/middleware/validationHandler");

const { createUserSchema } = require("../utils/schemas/users")

const {config} = require("../config");

require('../utils/auth/strategies/basic')

function authApi(app) {
    const router = express.Router();
    app.use("/api/auth", router);

    const apiKeysService = new ApiKeysService();
    const usersService = new UsersService();

    router.post("/login", async (req, res, next) => {
        const { apiKeyToken } =  req.body;
        if(!apiKeyToken) {
            next(boom.unauthorized("apiKeyToken is required"));
        }

        passport.authenticate("basic", null, (error, user) => {
            try {
                if (error || !user) {
                    next(boom.unauthorized());
                }

                req.login(user, {session: false}, async () => {
                   if (error) {
                       next(error)
                   }
                   const apiKey = await apiKeysService.getApiKey({token: apiKeyToken});

                   if (!apiKey) {
                       next(boom.unauthorized());
                   }

                   const {_id: id, lastName, userName, name, email} = user;

                   const payload = {
                       sub: id,
                       name,
                       lastName,
                       userName,
                       email,
                       scopes: apiKey.scopes
                   }

                   const token = jwt.sign(payload, config.authJwtSecret, {
                       expiresIn: "15m"
                   });

                   return res.status(200).json({token, user: {id, name, lastName, userName, email}});
                });
            } catch (e) {
                next(e);
            }
        })(req, res, next)
    });

    router.post("/sign-up", validationHandler(createUserSchema), async (req, res, next) => {
       const {body: user} = req;
       try {
           const createdUserId = await usersService.createUser({user});
           res.status(200).json({
               data: createdUserId,
               message: "user created"
           })
       } catch (e) {
           next(e);
       }
    });

}

module.exports = authApi;

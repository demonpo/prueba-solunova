const express = require("express");
const UserService = require("../services/users")
const passport = require("passport");
const scopesValidationHandler = require("../utils/middleware/scopesValidationHandler")

require('../utils/auth/strategies/basic')
require('../utils/auth/strategies/jwt')
const validationHandler = require("../utils/middleware/validationHandler");
const {userIdSchema} = require("../utils/schemas/users");

function usersApi(app) {
    const router = express.Router();
    const usersService = new UserService();
    app.use("/api/users", router);

    router.get("/",
        passport.authenticate("jwt", {session: false}),
        scopesValidationHandler(["read:users"]),
        async (req, res, next) => {
       try {
           const users = await usersService.getUsers();
           res.status(200).json({
               data: users,
               message: "Usuarios listados"
           });
       }catch (e) {
           next(e);
       }
    });

    router.get(
        '/:userId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:usersById']),
        validationHandler(userIdSchema , 'params'),
        async function(req, res, next) {
            const { userId } = req.params;

            try {
                const user = await usersService.getUserById({ userId });

                res.status(200).json({
                    data: user,
                    message: 'User retrieved'
                });
            } catch (err) {
                next(err);
            }
        }
    );

    router.delete(
        '/:userId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:users']),
        validationHandler(userIdSchema , 'params'),
        async function(req, res, next) {
            const { userId } = req.params;
            console.log("dentro de delte")
            try {
                const deletedUserId = await usersService.deleteUser({ userId });

                res.status(200).json({
                    data: deletedUserId,
                    message: 'User deleted'
                });
            } catch (err) {
                next(err);
            }
        }
    );


}


module.exports = usersApi;

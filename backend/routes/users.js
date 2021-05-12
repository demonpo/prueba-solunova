const express = require("express");


function usersApi(app) {
    const router = express.Router();
    app.use("/api/users", router);

    router.get("/", async (req, res, next) => {
       try {
           const users = await Promise.resolve([
               {
                   id: 1,
                   name: "Daniel"
               }
           ]);
           res.status(200).json({
               data: users,
               message: "Usuarios listados"
           });
       }catch (e) {
           next(e);
       }
    })
}


module.exports = usersApi;

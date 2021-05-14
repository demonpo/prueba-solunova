const express = require('express');
const app = express();
const passport = require("passport");

const usersApi = require('./routes/users.js');
const authApi = require("./routes/auth")
const {config} = require("./config");

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');


app.use(express.json());

// Routers
authApi(app);
usersApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

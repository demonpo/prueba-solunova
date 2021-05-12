const express = require('express');
const app = express();

const usersApi = require('./routes/users.js');
const {config} = require("./config");


app.use(express.json());

usersApi(app);


app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

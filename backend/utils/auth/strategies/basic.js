const passport = require("passport");
const { BasicStrategy } =  require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersService = require("../../../services/users");


passport.use("basic",
    new BasicStrategy(async function(email, password, cb) {
        console.log(email);
        const userService = new UsersService();

        try {
            const user = await userService.getUser({ email });
            console.log(user);
            if (!user) {
                return cb(boom.unauthorized(), false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb(boom.unauthorized(), false);
            }
            console.log(user);
            delete user.password;



            console.log(user);
            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);

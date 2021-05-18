

const passport = require("passport");
const { BasicStrategy } =  require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersService = require("../../../services/users");
const {userNameRE} = require("../../regexValidators");
const {emailRE} = require("../../regexValidators");


passport.use("basic",
    new BasicStrategy(async function(emailOrUserName, password, cb) {
        const userService = new UsersService();

        try {
            let user;
            if (emailOrUserName.match(emailRE)) {user = await userService.getUser({ email: emailOrUserName }); }
            if (emailOrUserName.match(userNameRE)) {user = await userService.getUserByUserName({ userName: emailOrUserName }); }

            console.log(user);
            if (!user) {
                return cb(boom.unauthorized(), false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb(boom.unauthorized(), false);
            }
            delete user.password;

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);

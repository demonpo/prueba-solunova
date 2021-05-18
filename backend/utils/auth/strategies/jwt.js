const passport = require("passport");
const { Strategy, ExtractJwt, JwtStrategy } = require("passport-jwt");
const boom = require("@hapi/boom");

const UsersService = require("../../../services/users");
const { config } = require("../../../config");

passport.use(
    "jwt",
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (tokenPayload, cb) => {
            const usersService = new UsersService();
            try {
                const user = await usersService.getUser({email: tokenPayload.email});
                if(!user) {
                    return cb(boom.unauthorized(), false);
                }

                delete user.password

                cb(null, {...user, scopes: tokenPayload.scopes});

            } catch (e) {
                return cb(e);
            }
        }
    ),
);

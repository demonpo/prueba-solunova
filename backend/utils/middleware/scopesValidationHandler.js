const boom =  require("@hapi/boom");

function scopesValidationHandler(allowedScopes) {
    return (req, res, next) => {
        if(!req.user || (req.user && !req.user.scopes)) {
            return next(boom.unauthorized("Missing scopes"));
        }

        const hasAccess = allowedScopes.map(allowedScopes => req.user.scopes.includes(allowedScopes))
            .find(allowed => Boolean(allowed));

        if(hasAccess) {
            return next();
        } else {
            return next(boom.unauthorized("Insufficient scopes"))
        }

    }
}

module.exports = scopesValidationHandler;

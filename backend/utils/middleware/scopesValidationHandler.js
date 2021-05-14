const boom =  require("@hapi/boom");

function scopesValidationHandler(allowedScopes) {
    console.log("SCOPE VALIDATION HANDLER");
    return (req, res, next) => {
        if(!req.user || (req.user && !req.user.scopes)) {
            next(boom.unauthorized("Missing scopes"));
        }

        const hasAccess = allowedScopes.map(allowedScopes => req.user.scopes.includes(allowedScopes))
            .find(allowed => Boolean(allowed));

        if(hasAccess) {
            next();
        } else {
            console.log("NEXT SCOPESHANDLER")
            next(boom.unauthorized("Insufficient scopes"))
        }

    }
}

module.exports = scopesValidationHandler;

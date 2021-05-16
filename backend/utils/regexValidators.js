const userNameRE = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
const emailRE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = {
    userNameRE,
    emailRE
}

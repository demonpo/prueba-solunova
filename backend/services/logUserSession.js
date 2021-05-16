const MongoLib = require("../lib/mongo");

class LogUserSessionService {
    constructor() {
        this.collection = "logsUserSession";
        this.mongoDB = new MongoLib();
    }

    async getlogs() {
        const users = await this.mongoDB.getAll(this.collection, null);
        return users || [];
    }


    async createLogUserSession({ logUserSession }) {
        console.log(logUserSession);
        const { timestamp, userId, userName } = logUserSession;

        const createdLogUserSession = await this.mongoDB.create(this.collection, {
            timestamp,
            userId,
            userName,
        });

        return createdLogUserSession;
    }


}

module.exports = LogUserSessionService;

const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");

class UsersService {
    constructor() {
        this.collection = "users";
        this.mongoDB = new MongoLib();
    }

    async getUsers() {
        const users = await this.mongoDB.getAll(this.collection, null);
        return users || [];
    }

    async getUser({email}) {
        console.log("GET BY EMAIL");
        const [user] = await this.mongoDB.getAll(this.collection, {email});
        return user;
    }

    async getUserByUserName({userName}) {
        console.log("GET BY USERNAME");
        const [user] = await this.mongoDB.getAll(this.collection, {userName});
        return user;
    }


    async getUserById({userId}) {
        const [user] = await this.mongoDB.getAll(this.collection, userId);
        return user;
    }

    async createUser({ user }) {
        const { name, lastName, userName, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserId = await this.mongoDB.create(this.collection, {
            name,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        return createUserId;
    }

    async updateUser({ userId, user } = {}) {
        const updatedUserId = await this.mongoDB.update(
            this.collection,
            userId,
            user
        );
        return updatedUserId;
    }

    async deleteUser({ userId }) {
        const deletedUserId = await this.mongoDB.delete(this.collection, userId);
        return deletedUserId;
    }

}

module.exports = UsersService;



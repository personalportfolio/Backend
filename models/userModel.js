const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
    constructor(id, first_name, last_name, email_address, password, about) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_address = email_address;
        this.password = password;
        this.about = about;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
        try {
            const response = await db.one(
                `SELECT * FROM users WHERE email = $1;`,
                [this.email_address]
            );
            const valid = this.checkPassword(response.password);
            // ! = Not True   !! = forces to a boolean
            if (!!valid) {
                const { id, first_name, last_name } = response;
                return { isValid: valid, user_id: id, first_name, last_name };
            } else {
                return { isValid: valid };
            }
        } catch (err) {
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(
                `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
                [
                    this.first_name,
                    this.last_name,
                    this.email_address,
                    this.password
                ]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getInfo(user_id) {
        try {
            const response = await db.one(`SELECT * FROM users where id = $1;`,
            [user_id]);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    async updateDescription(about, id) {
        try {
            const response = await db.one(
                `UPDATE users SET about = ${1} WHERE id = ${2};`,
                [
                    this.about,
                    this.id
                ]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }
}


module.exports = User;

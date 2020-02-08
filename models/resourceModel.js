const db = require('./conn.js');

class Resource {
    constructor(id, title, type, description, url) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.url = url;
    }

    static async getResources() {
        try {
            const response = await db.any(`SELECT * FROM resources`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getResourceByID(id) {
        try {
            const response = await db.one (
                `SELECT * FROM resources WHERE id = $1;`,
                [id]);
                return response;
        }   catch (err) {
            return err.message;
        }
    }

    async addResource() {
        try {
            const response = await db.result(
            `INSERT INTO resources (title, type, description, url) VALUES ($1, $2, $3, $4);`,
            [this.title, this.type, this.description, this.url]);
            return response;
        } catch (err) {
            return err.message
        }
    }
    

}

module.exports = Resource;
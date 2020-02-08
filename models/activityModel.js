const db = require('./conn.js');

class ActivityLog {
    constructor(id, user_id, resource_id, activity_name, activity_description, date_completed, hours_spent) {
        this.id = id;
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.activity_name = activity_name;
        this.activity_description = activity_description;
        this.date_completed = date_completed;
        this.hours_spent = hours_spent;
    }

    static async getAll() {
        try {
            const response = await db.any(`SELECT * FROM activity_log`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getRecentActivity() {
        try {
            const response = await db.any(`
            SELECT u.first_name, u.last_name, al.*
                FROM activity_log al
                INNER JOIN users u on al.user_id = u.id
                ORDER BY al.date_completed DESC
                LIMIT 10;
            `)
            return response;
        } catch(err) {
            return err.message
        }
    }

    async addActivityLog() {
        try {
            const response = await db.result(
                `INSERT INTO activity_log (user_id, resource_id, activity_name, activity_description, date_completed, hours_spent) VALUES ($1, $2, $3, $4, $5, $6);`,
            [this.user_id, this.resource_id, this.activity_name, this.activity_description, this.date_completed, this.hours_spent]);
            return Response;
        } catch(err) {
            return err.message
        }
            
    }


}


module.exports = ActivityLog;
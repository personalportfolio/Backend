const db = require('./conn.js');

class LogEntry {
    constructor(activity_log_id, user_id, resource_id, activity_name, activity_description, date_completed, hours_spent,
        title, type, description, url,
        stars, content) {
        this.activity_log_id = activity_log_id;
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.activity_name = activity_name;
        this.activity_description = activity_description;
        this.date_completed = date_completed;
        this.hours_spent = hours_spent;
        this.title= title;
        this.type = type;
        this.description = description;
        this.url = url;
        this.stars = stars;
        this.content = content;
        }

    async saveActivity() {
        try {
            const response = await db.one(
                `INSERT INTO `
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    async saveResource() {
        try {
            const response = await db.one(
                `INSERT INTO resources (title, type, description, url) VALUES ($1, $2, $3, $4);`,
                [this.title, this.type, this.description, this.url]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    async saveReview() {
        try {
            const response = await db.one(
                `INSERT INTO `
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }
}


module.exports = ActivityLog;
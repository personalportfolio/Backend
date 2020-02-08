const db = require('./conn.js');

class Review {
    constructor(id, user_id, resource_id, stars, content) {
        this.id = id;
        this.user_id = user_id;
        this.resource_id = resource_id;
        this.stars = stars;
        this.content = content;
    }

    static async getReviews() {
        try {
            const response = await db.any(`SELECT * FROM reviews`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getReviewsByResourceID(resource_id) {
        try {
            const response = await db.any (
                `SELECT * FROM reviews WHERE resource_id = $1;`,
                [resource_id]);
                return response;
        }   catch (err) {
            return err.message;
        }
    }

    async addReview() {
        try {
            const response = await db.result(`INSERT INTO reviews (user_id, resource_id, stars, content) VALUES ($1, $2, $3, $4);`,
            [this.user_id, this.resource_id, this.stars, this.content]);
            return response;
        } catch (err) {
            return err.message
        }
    }
    
}

module.exports = Review;

const express = require("express");
const router = express.Router();

const ResourceModel = require('../models/resourceModel');
const ReviewModel = require('../models/reviewModel');
const activityModel = require('../models/activityModel');

router.get("/", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Log Entry",
            isLoggedIn: req.session.is_logged_in
        },
        partials: {
            partial: "partial-log-entry"
        }
    });
});

router.post('/add-resource', async (req, res, next) => {
    const { title, type, description, url } = req.body;

    const resourceInstance = new ResourceModel(null, title, type, description, url);
    const response = await resourceInstance.addResource();

    if (response) {
        res.status(200).redirect("/");
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;
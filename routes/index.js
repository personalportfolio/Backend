const express = require("express");
const router = express.Router();

const userClass = require("../models/userModel");
const ActivityModel = require('../models/activityModel');
const ResourceModel = require('../models/resourceModel');

/* GET home page. */
router.get("/", async (req, res, next) => {
    const userData = await userClass.getInfo();
    const resourceData = await ResourceModel.getResources();
    const recentActivity = await ActivityModel.getRecentActivity();
    res.render("template", {
        locals: {
            title: "Home Page",
            resourceData: resourceData,
            recentActivity: recentActivity,
            isLoggedIn: req.session.is_logged_in,
            user_id: req.session.user_id,
            first_name: req.session.first_name
        },
        partials: {
            partial: "partial-index"
        } 
    });
});

router.post('/add-activity', async (req, res, next) => {
    const { user_id, resource_id, activity_name, activity_description, date_completed, hours_spent } = req.body;

    const activityInstance = new ActivityModel(null, user_id, resource_id, activity_name, activity_description, date_completed, hours_spent);
    const response = await activityInstance.addActivityLog();

    if (response) {
        res.status(200).redirect("/");
    } else {
        res.sendStatus(500);
    }
});


module.exports = router;

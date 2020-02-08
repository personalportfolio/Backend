const express = require("express");
const router = express.Router();

const ResourceModel = require('../models/resourceModel');
const ReviewModel = require('../models/reviewModel');

router.get('/', async (req, res, next) => {
    const resourceData = await ResourceModel.getResources();
    res.render("template", {
        locals: {
            title: "Resources Page",
            resourceData: resourceData
            ,isLoggedIn: req.session.is_logged_in
        },
        partials: {
            partial: "partial-resources"
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


router.get('/:resource_id', async (req, res, next) => {
    const { resource_id } = req.params;
    const theResource = await ResourceModel.getResourceByID(resource_id);
    const theResourceReviews = await ReviewModel.getReviewsByResourceID(resource_id);
console.log("session variables ", req.session);
    res.render('template', {
        locals: {
            title: 'Reviews for this resource',
            resourceData: theResource,
            resourceReviews: theResourceReviews,
            isLoggedIn: req.session.is_logged_in,
            user_id: req.session.user_id
            
        },
        partials: {
            partial: 'partial-resource-review'
        }
    });
});

router.post('/:resource_id/add-review', async (req, res, next) => {
    const { resource_id } = req.params
    const { user_id, stars, content } = req.body;

    const reviewInstance = new ReviewModel(null, user_id, resource_id, stars, content);
    const response = await reviewInstance.addReview();

    if (response) {
        res.status(200).redirect("/resources");
    } else {
        res.sendStatus(500);
    }
});


module.exports = router;
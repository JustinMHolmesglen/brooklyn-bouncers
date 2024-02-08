const express = require('express');
const router = express.Router();

const fileServerUpload = require('../middleware/fileServerUpload');
// const ProductController = require('../controllers/productController');
// const ProductPolicy = require('../policies/productPolicy');
const FeedbackController = require('../controllers/feedbackController');
const FeedbackPolicy = require('../policies/feedbackPolicy');
// const FilePolicy = require('../policies/filePolicy')
// const verifyAuth = require('../middleware/verifyAuth');

module.exports = () => {
// get all prod
router.get('/', FeedbackController.getFeedback)
// save customer feedback
router.post('/', FeedbackPolicy.validateFeedback,  FeedbackController.postFeedback);


return router
}

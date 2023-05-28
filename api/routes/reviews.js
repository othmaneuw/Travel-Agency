const express = require('express');
const {addReview} = require('../controllers/reviews');

const router = express.Router();

router.post('/',addReview);

module.exports = router;
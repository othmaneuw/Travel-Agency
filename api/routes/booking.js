const express = require('express');
const {bookTheTrip} = require('../controllers/booking');

const router = express.Router();

router.post('/add',bookTheTrip);

module.exports = router;
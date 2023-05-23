const express = require('express');
const {bookTheTrip,getBookingsByUser} = require('../controllers/booking');

const router = express.Router();

router.post('/add',bookTheTrip);
router.get('/by-user',getBookingsByUser);

module.exports = router;
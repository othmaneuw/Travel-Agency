const express = require('express');
const {bookTheTrip,getBookingsByUser, getAllBooking} = require('../controllers/booking');
const {filterAccessToBookings} = require('../middleware/filterAccessToBookings');

const router = express.Router();

router.post('/add',bookTheTrip);
router.get('/by-user',getBookingsByUser);
router.get('/',filterAccessToBookings,getAllBooking);

module.exports = router;
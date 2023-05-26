const express = require("express");
const {
  bookTheTrip,
  getBookingsByUser,
  getAllBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/booking");
const {
  filterAccessToBookings,
} = require("../middleware/filterAccessToBookings");

const router = express.Router();

router.post("/add", bookTheTrip);
router.get("/by-user", getBookingsByUser);
router.get("/", filterAccessToBookings, getAllBooking);
router.put("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

module.exports = router;

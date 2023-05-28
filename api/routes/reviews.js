const express = require("express");
const {
  addReview,
  getAllReviews,
  getReviewById,
  validateReview,
} = require("../controllers/reviews");

const router = express.Router();

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", validateReview);

module.exports = router;

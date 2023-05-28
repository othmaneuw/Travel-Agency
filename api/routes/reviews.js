const express = require("express");
const {
  addReview,
  getAllReviews,
  getReviewById,
  validateReview,
  deleteReview,
} = require("../controllers/reviews");

const router = express.Router();

router.post("/", addReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", validateReview);
router.delete('/:id',deleteReview);

module.exports = router;

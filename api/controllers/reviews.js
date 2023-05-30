const Review = require("../models/Review");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const addReview = async (req, res) => {
  const { body, trip } = req.body;
  const { token } = req.cookies;
  if (!body) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ mssg: "you can't submit an empty comment" });
  }
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ mssg: "couldn't add review , you must sign in first" });
    const reviewDoc = await Review.create({
      user: userData.id,
      trip: trip._id,
      body,
      status: "pending",
    });
    res.status(StatusCodes.CREATED).json(reviewDoc);
  });
};

const getAllReviews = (req, res) => {
  Review.find({})
    .populate("user")
    .populate("trip")
    .then((response) => res.status(StatusCodes.OK).json(response));
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  const reviewDoc = await Review.findById(id).populate("user").populate("trip");
  res.status(StatusCodes.OK).json(reviewDoc);
};

const validateReview = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const reviewDoc = await Review.findByIdAndUpdate(
    { _id: id },
    { status: "valid" },
    { new: true }
  );
  res.json(reviewDoc);
};

const deleteReview = async (req, res) => {
  await Review.findByIdAndRemove(req.params.id);
  res.json({ mssg: "deleted succesfully" });
};

const getValidReviews = async (req, res) => {
  res.status(StatusCodes.OK).send('heello');
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  validateReview,
  deleteReview,
  getValidReviews,
};

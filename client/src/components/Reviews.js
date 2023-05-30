import axios from "axios";
import { useEffect, useState } from "react";

const Reviews = ({ trip }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    axios.get("/reviews").then((response) => {
      const validReviews = response.data.filter(
        (review) =>
          (review.status === "valid" && review.trip._id === trip._id)
      );
      setReviews(validReviews);
      console.log(validReviews);
    });
  }, []);
  const submitReview = async (e) => {
    e.preventDefault();
    setReviewSubmitted(false);
    setError(false);
    try {
      const { data } = await axios.post(
        "/reviews",
        { body: review, trip },
        { withCredentials: true }
      );
      console.log("hello");
      setReviewSubmitted(true);
      setReview("");
    } catch (error) {
      //console.log('hellooo',error.response.data.mssg);
      setError(error.response.data.mssg);
    }
  };

  return (
    <div className="mt-10 bg-primary text-white font-bold p-10 rounded-2xl">
      <h2 className="flex gap-2 items-center text-2xl">
        Reviews
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      </h2>
      <div className="flex gap-3">
        <button
          className={`mt-8 ${
            showReviews ? "bg-red-500" : "bg-gray-500"
          } text-white px-4 py-2 rounded-xl`}
          onClick={() => {
            setShowReviews(!showReviews);
            setAddReview(false);
            setReviewSubmitted(false);
            setError(false);
          }}
        >
          {showReviews ? "Close" : "Show Reviews"}
        </button>
        <button
          className={`mt-8 ${
            addReview ? "bg-red-500" : "bg-green-500"
          } text-white px-4 py-2 rounded-xl`}
          onClick={() => {
            setAddReview(!addReview);
            setShowReviews(false);
            setReviewSubmitted(false);
            setError(false);
          }}
        >
          {addReview ? "Cancel" : "Add Review"}
        </button>
      </div>
      {showReviews && (
        <div className="mt-5">
          <div className="bg-gray-700 p-8 rounded-xl">
            <h3 className="text-xl text-center">Reviews</h3>
            {reviews.length > 0 && reviews.map(review =>(
              <div>
                {review.body}
              </div>
            ))}
          </div>
        </div>
      )}
      {addReview && (
        <div className="mt-5 bg-gray-700 p-4 text-white font-bold rounded-xl">
          <form className="flex" onSubmit={submitReview}>
            <div>
              <label className="mt-10">Add your Review :</label>
              <button className="mt-10 bg-green-500 p-2 rounded-xl">
                Submit
              </button>
            </div>
            <textarea
              className="text-gray-500 border border-gray-700"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </form>
          {reviewSubmitted && (
            <div className="my-3">
              <h4 className="text-center text-green-500">
                Your comments will be showed up after verification
              </h4>
            </div>
          )}
          {error && (
            <div className="my-3">
              <h4 className="text-center text-red-500">{error}</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../context/UserContext";
import {Navigate} from 'react-router-dom';

const Reviews = ({ trip }) => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    axios.get("/reviews").then((response) => {
      const validReviews = response.data.filter(
        (review) => review.status === "valid" && review.trip._id === trip._id
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

  const removeReview = (id) =>{
    axios.delete(`/reviews/${id}`).then(response => setRedirect(true))
  }

  if(redirect){
    return <Navigate to='/' />
  }

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
            {reviews.length === 0 && <h2 className="mt-6 text-center text-red-500">No reviews for this trip</h2>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div className="bg-gray-500 flex p-4 rounded-xl mt-6 gap-4 items-center">
                  <span className="bg-black p-3 rounded-full flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {review.user.name}
                  </span>
                  <div className="bg-green-500 flex gap-80 py-6 px-6 rounded-full">
                    <p>{review.body}</p>
                    <span className="text-sm text-gray-800">
                      {formatDistanceToNow(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {user?.name === review.user.name && (
                    <button className="bg-red-500 p-2 rounded-full" onClick={()=>removeReview(review._id)}>
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
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

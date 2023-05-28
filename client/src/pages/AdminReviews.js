import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import SearchTrip from "../components/SearchTrip";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get("/reviews").then((response) => {
      setReviews(response.data);
    });
  }, []);
  return (
    <div>
      <SearchTrip />
      <AccountNav />
      <div className="mt-20 text-center">
        {reviews.length === 0 && (
          <div>
            <h2 className="text-primary font-bold text-xl">No reviews</h2>
          </div>
        )}
        {reviews.length > 0 && (
          <table className="styled-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Trip</th>
                <th>Time</th>
                <th>Review</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr>
                  <td>{review.user.name}</td>
                  <td>{review.trip.title}</td>
                  <td>
                    {format(new Date(review.createdAt), "yyyy-MM-dd,hh:mm:ss")}
                  </td>
                  <td>{review.body.slice(0, 5)}...</td>
                  <td
                    style={{
                      color: review.status === "valid" ? "#22c55e" : "#f97316",
                      fontWeight: "bolder",
                    }}
                  >
                    {review.status}
                  </td>
                  <td>
                    <Link to={`/account/reviews/${review._id}`}>
                      <button className="bg-primary text-white font-bold p-2">
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;

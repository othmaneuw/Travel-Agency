import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const SingleReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    axios.get("/reviews/" + id).then((response) => setReview(response.data));
  }, [id]);
  const validateReview = async (id) =>{
      await axios.put('/reviews/'+id);
      setRedirect(true);
  }
  const deleteReview = async () =>{
    await axios.delete('/reviews/'+id);
    setRedirect(true);
  }
  if(redirect){
    return <Navigate to='/account/reviews' />
  }
  return (
    <div>
      {review && (
        <div className="mt-20 font-bold bg-gray-500 text-white p-10 rounded-xl">
          <h2 className="text-2xl text-center">Review : </h2>
          <h4 className="mt-10 flex gap-2 items-end">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            User : <span>{review.user.name}</span>
          </h4>
          <h4 className="mt-5 flex gap-2 items-end">
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
                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
            Trip : {review.trip.title}
          </h4>
          <h4 className="mt-5 flex gap-2 items-end">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Created At :{" "}
            {format(new Date(review.createdAt), "yyyy-MM-dd , hh:mm:ss")}
          </h4>
          <h4 className="mt-5 flex gap-2 items-end">
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
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Body : {review.body}
          </h4>
          <h4 className={`mt-5 flex gap-2 items-end`}>
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
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            Status : <span className={`${review.status === 'pending' ? 'text-primary': 'text-green-500'}`}>{review.status}</span>
          </h4>
          <div className="mt-7 flex gap-2 justify-center">
              <button className="bg-green-500 py-2 px-4 rounded-2xl" onClick={()=>validateReview(id)}>Validate</button>
              <button className="bg-red-500 py-2 px-4 rounded-2xl" onClick={deleteReview}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleReview;

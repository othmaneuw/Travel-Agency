import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Booking = ({ booking, admin }) => {
  const [redirect,setRedirect] = useState(false);
  const cancelTrip = async (id) =>{
       axios.put(`/bookings/${id}`,{status : 'canceled'}).then(response => setRedirect(true));
  }
  if(redirect) return <Navigate to='/account' />
  return (
    <div>
      <div className="mt-20 flex gap-10 items-center bg-gray-200 rounded-2xl">
      <div>
        <img
          width="300px"
          height="300px"
          className="rounded-2xl"
          src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
          alt={booking.place.title}
        />
      </div>
      <div>
        <p className="flex gap-3 text-primary font-bold m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
              clipRule="evenodd"
            />
          </svg>
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
              clipRule="evenodd"
            />
          </svg>
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </p>
        <h2 className="text-center mt-3 text-lg font-bold">
          {booking.place.title}
        </h2>
        <h3 className="flex gap-2 mt-2 text-violet-600 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}
          </span>
          Nights
        </h3>
        <h3 className="flex gap-2 mt-2 text-green-500 font-bold">
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
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
          <span>Total Price : </span> {booking.price} MAD
        </h3>
      </div>
      {!admin && (
        <div className="px-10 py-10 flex gap-2">
          <Link
            to={`/account/bookings/${booking._id}`}
            className="bg-primary py-4 px-8 text-white font-bold rounded-xl"
          >
            See More...
          </Link>
          <button className="bg-red-500 text-white px-2 font-bold rounded-xl" onClick={()=>cancelTrip(booking._id)}>Cancel</button>
        </div>
      )}
      {admin && (
        <div className="px-40 py-20 flex gap-2">
            <button className="bg-green-500 text-white py-2 px-4 font-bold rounded-xl">Validate</button>
            <button className="bg-red-500 text-white py-2 px-4 font-bold rounded-xl">Cancel</button>
        </div>
      )}
    </div>
    <p className="text-green-500 font-bold mt-2 text-center">This booking was just validated by the admin</p>
    </div>
  );
};

export default Booking;

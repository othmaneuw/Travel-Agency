import AccountNav from "../components/AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
import Booking from "../components/Booking";
import SearchTrip from "../components/SearchTrip";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const getBookings = async () => {
    const response = await axios.get("/bookings/by-user", {
      withCredentials: true,
    });
    setBookings(response.data);
    //console.log(response.data);
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
      <SearchTrip />
      <AccountNav />
      {bookings.length === 0 && (
        <h1 className=" flex gap-2 items-end text-primary font-bold text-xl text-center text-xl mt-10">
          You haven't booked for any trip or the trip you have choosen is not
          valid yet (just wait our call{" "}
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
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          )
        </h1>
      )}
      {bookings.length > 0 &&
        bookings.map((booking) => {
          if (booking.status === "valid") {
            return (
              <Booking key={booking._id} booking={booking} admin={false} />
            );
          } else {
            const bgColor = booking.status === 'pending' ? 'bg-gray-800':'bg-red-800';
            const text = booking.status === 'pending' ? 'Still waiting for the admins to validate the booking ...':'This booking was canceled';
            return (
              <div className={`${bgColor} mt-10 py-4 px-6 text-white font-bold rounded-xl`}>
                <h2 className="text-xl mb-3">{booking.place.title}</h2>
                <h3>Total Price : {booking.price} MAD </h3>
                <p>Name : {booking.name}</p>
                <p>Phone : {booking.phone}</p>
                <p className="text-black flex gap-2">
                  {text}
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
                </p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Bookings;

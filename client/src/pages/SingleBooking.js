import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    axios
      .get("/bookings/by-user", { withCredentials: true })
      .then((response) => {
        const bookingDoc = response.data.find(({ _id }) => _id === id);
        setBooking(bookingDoc);
      });
  }, [id]);
  if (showAllPhotos) {
    return (
      <div className="absolute min-w-full min-h-screen bg-primary inset-0">
        <div className="grid">
          <h1 className="text-white text-2xl ml-10 mt-5 font-bold">
            Photos of :{booking.place.title}
          </h1>
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed flex bg-white font-bold rounded-2xl py-2 px-4 top-12 right-3"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          <div>
            {booking.place.photos.map((photo) => (
              <div className="p-5 bg-primary">
                <img
                  src={`http://localhost:4000/uploads/${photo}`}
                  width="100%"
                  height="800px"
                  alt={booking.place.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-10">
      {booking && (
        <div className="bg-primary py-10 px-10 rounded-xl text-white font-bold">
          <h1 className="text-2xl">{booking.place.title}</h1>
          <a
            href={"https://maps.google.com/?q=" + booking.place.address}
            target="_blank"
            className="mt-4 underline flex gap-2"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            {booking.place.address}
          </a>
          <div className="mt-5">
            <h2 className="flex gap-2">
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
              <span>From :</span>{" "}
              {format(new Date(booking.checkIn), "yyyy-MM-dd")}
            </h2>
            <h2 className="flex gap-2">
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
              <span>To :</span>
              {format(new Date(booking.checkOut), "yyyy-MM-dd")}
            </h2>
          </div>
          <div className="mt-5">
            <h1 className="text-xl flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Total Price : {booking.price} MAD
            </h1>
          </div>
          <div
            onClick={() => setShowAllPhotos(true)}
            className="grid gap-2 grid-cols-[2fr_1fr] mt-10"
          >
            <div>
              <img
                src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                className="cursor-pointer rounded-xl"
                alt={booking.place.title}
              />
            </div>
            <div className="grid relative">
              <img
                className="cursor-pointer rounded-xl"
                src={`http://localhost:4000/uploads/${booking.place.photos[1]}`}
                alt={booking.place.title}
              />
              <img
                className="cursor-pointer rounded-xl"
                src={`http://localhost:4000/uploads/${booking.place.photos[2]}`}
                alt={booking.place.title}
              />
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex relative gap-2 bg-white px-4 py-2 rounded-2xl text-black mt-5 font-bold absolute -top-1 right-1"
          >
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show All the pictures
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleBooking;

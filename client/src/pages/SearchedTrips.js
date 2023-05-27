import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { Link } from "react-router-dom";

const SearchedTrips = () => {
  const { globalTrip } = useContext(TripContext);
  console.log("hello", globalTrip);
  return (
    <div className="mt-10">
      {globalTrip.length === 0 && (
        <div className="text-center">
          <h1 className="flex gap-2 justify-center text-center text-xl text-red-500 font-bold">
            No Trip Found
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
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </h1>
        </div>
      )}
      {globalTrip.length > 0 && <h2 className="text-center text-xl text-green-500 font-bold">{globalTrip.length} Trip(s) Found</h2>}
      {globalTrip.map((trip) => (
        <div className="mb-5 bg-gray-200 py-6 px-6 grid grid-cols-[2fr_2fr] mt-10 rounded-xl">
          <div>
            <img
              src={`http://localhost:4000/uploads/${trip.photos[0]}`}
              alt={trip.title}
              width={"500px"}
              height={"500px"}
              className="rounded-xl"
            />
          </div>
          <div className="font-bold">
            <h1 className="text-primary text-xl">{trip.title}</h1>
            <h2 className="text-green-500 mt-5 text-lg">
              Price : {trip.price} MAD
            </h2>
            <h2 className="text-blue-500 mt-9">{trip.address}</h2>
            <p className="mt-5 text-red-500 mb-7">{trip.extraInfo}</p>
            <Link to={`/place/${trip._id}`}>
              <button className="bg-white px-4 py-2 rounded-xl text-primary">
                See more details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchedTrips;

import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchTrip from "./SearchTrip";

const Places = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places/user", { withCredentials: true }).then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <SearchTrip />
      <AccountNav />
      <div className="text-center mt-10">
        <Link
          className="inline-flex bg-primary text-white py-2 px-4 rounded-full"
          to="/account/places/new"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new
        </Link>
      </div>
      <div>
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="flex gap-5 bg-gray-200 items-center p-10 mt-20 mb-10"
            >
              <div className="w-100 h-100 relative">
                <img
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  alt={place.title}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{place.title}</h2>
                <p className="text-sm text-gray">{place.description}</p>
                <p className="mt-10 text-2xl text-orange-500">
                  {place.price} MAD
                </p>
                <Link to={`/account/places/${place._id}`}>
                  <button className="mt-5 bg-orange-500 p-4 text-white font-bold rounded-2xl">
                    Edit the Trip
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Places;

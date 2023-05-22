import { Link } from "react-router-dom";

const BookingWidget = ({ place }) => {
  return (
    <div>
      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="border border-gray-400 p-4 text-center rounded-3xl">
          <h1 className="text-primary font-bold text-3xl">
            CheckIn & checkOut Times :
          </h1>
          <h2 className="mt-5">
            <span className="text-primary font-bold">Check In</span> :
            {place.checkIn}
          </h2>
          <h2 className="mt-5">
            <span className="text-primary font-bold">Check Out</span> :
            {place.checkOut}
          </h2>
        </div>
        <div className="text-white font-bold bg-primary rounded-3xl text-center">
          <h3 className="mt-5 flex justify-center gap-3 text-xl">
            {place.price} MAD / per person
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
          </h3>
          <div className="mt-4 grid grid-cols-2">
            <div>
              <label>Check In : </label>
              <input type="date" className="text-black px-5 rounded-xl" />
            </div>
            <div>
              <label>Check Out : </label>
              <input type="date" className="text-black px-5 rounded-xl" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
            <label>Number of persons :</label>
            <input type="number" className="text-black" />
          </div>
          <div className="mt-5">
            <button className="bg-white mb-4 py-2 px-4 text-primary rounded-2xl">
              Book the trip
            </button>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="mt-10 bg-gray-200 w-full p-10 font-bold rounded-2xl">
        <h2 className="text-2xl">Extra Infos</h2>
        <p className="text-md mt-5 text-primary font-bold">{place.extraInfo}</p>
      </div>
      <div className="mt-5">
        <Link to="/">
          <button className=" flex gap-3 bg-primary py-2 px-4 rounded-full text-white font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingWidget;

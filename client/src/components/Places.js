import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "./Perks";

const Places = () => {
  const headingStyle = "text-left text-2xl text-gray-500 mb-3 ml-4";

  const { action } = useParams();
  //console.log(action);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLinks, setPhotoLinks] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const inputTitle = (title) => {
    return <h2 className={headingStyle}>{title}</h2>;
  };
  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
            {inputTitle("Title")}
            <input
              type="text"
              placeholder="Title , for exp 7 days of paradise in Bahamas !"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {inputTitle("Address")}
            <input
              type="text"
              placeholder="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {inputTitle("Photos")}
            <p className={`text-left text-gray-600 mb-3 ml-4 text-md`}>
              More = Better
            </p>
            <div className="flex gap-2 align-center">
              <input
                type="text"
                placeholder="Upload images by link ...jpg"
                value={photoLinks}
                onChange={(e) => setPhotoLinks(e.target.value)}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add photo
              </button>
            </div>
            <div className="text-left mt-2">
              <button
                className={`border border-gray-300 rounded-2xl px-10 py-4 text-gray-500 flex gap-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload
              </button>
            </div>
            {inputTitle("Description")}
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
            {inputTitle("Perks")}
            <Perks selected={perks} onChange={setPerks} />
            {inputTitle("Extra Info")}
            <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} />
            {inputTitle("Check In & Out times")}
            <div className="flex gap-3">
              <div className="flex gap-2">
                <h3 className="text-red-600">Check in time</h3>
                <input type="text" placeholder="14:00" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <h3 className="text-red-600">Check out time</h3>
                <input type="text" placeholder="18:00" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <h3 className="text-red-600">Max number of guests</h3>
                <input type="number" value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)} />
              </div>
            </div>
            <button className="primary my-4 p-4 flex justify-center gap-5">
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
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <span>Save the tour</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;

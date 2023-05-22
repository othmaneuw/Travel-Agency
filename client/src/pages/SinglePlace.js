import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const SinglePlace = () => {
  const { id } = useParams();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (showAllPhotos) {
    return (
      <div className="absolute min-w-full min-h-screen bg-black inset-0">
        <div className="grid">
          <h1 className="text-white text-2xl ml-10 mt-5 font-bold">
            Photos of :{place.title}
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
            {place.photos.map((photo) => (
              <div className="p-5 bg-black">
                <img
                  src={`http://localhost:4000/uploads/${photo}`}
                  width="100%"
                  height="800px"
                  alt={place.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (!place) return "Loading ...";
  return (
    <div>
      <h1 className="text-2xl font-bold">{place.title}</h1>
      <a
        className="flex gap-2 underline mt-3"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr] mt-10">
        <div>
          <img
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            className="cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
        <div className="grid relative">
          <img
            className="cursor-pointer"
            src={`http://localhost:4000/uploads/${place.photos[1]}`}
            onClick={() => setShowAllPhotos(true)}
          />
          <img
            className="cursor-pointer"
            src={`http://localhost:4000/uploads/${place.photos[2]}`}
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex relative gap-2 bg-primary px-4 py-2 rounded-2xl text-white font-bold absolute -top-1 right-1"
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
      <div className="my-6">
        <h2 className="font-semibold text-2xl">Description</h2>
        {place.description}
      </div>
      <hr></hr>
      <BookingWidget place={place} />
    </div>
  );
};

export default SinglePlace;

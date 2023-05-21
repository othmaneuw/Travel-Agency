import Perks from "../components/Perks";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

const PlacesForm = () => {
  const { id } = useParams();
  const inputTitle = (title) => {
    return <h2 className={headingStyle}>{title}</h2>;
  };
  const headingStyle = "text-left text-2xl text-gray-500 mb-3 ml-4";
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState();
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const addPhotoLink = async () => {
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    console.log(data);
    setAddedPhotos((prev) => {
      return [...prev, data];
    });
    setPhotoLink("");
    //console.log(addedPhotos);
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, { headers: "Content-type:multipart/form-data" })
      .then((response) => {
        const { data } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...data];
        });
      });
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put(
        "/places",
        {
          id,
          ...placeData,
        },
        { withCredentials: true }
      );
      setRedirect(true);
    } else {
      await axios.post("/places", placeData, { withCredentials: true });
      setRedirect(true);
    }
  };

  const deletePhoto = (link) => {
    setAddedPhotos((prev) => {
      return [...prev.filter((photo) => photo !== link)];
    });
  };

  const selectAsMainPhoto = (link) =>{
    const addedPhotoWithoutSelected = addedPhotos.filter(photo => photo !== link);
    const newAddedPhoto = [link,...addedPhotoWithoutSelected];
    setAddedPhotos(newAddedPhoto);
  }

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then(({ data }) => {
      const {
        _id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = data;
      setTitle(title);
      setAddress(address);
      setAddedPhotos(photos);
      setDescription(description);
      setPerks(perks);
      setExtraInfo(extraInfo);
      setCheckIn(checkIn);
      setCheckOut(checkOut);
      setMaxGuests(maxGuests);
      setPrice(price);
    });
  }, [id]);

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <form onSubmit={savePlace}>
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
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            type="button"
            onClick={addPhotoLink}
            className="bg-gray-200 px-4 rounded-2xl"
          >
            Add photo
          </button>
        </div>
        <div className="text-left mt-2 flex items-center">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link, index) => (
              <div className="flex relative" key={index}>
                <img
                  width="250px"
                  height="250px"
                  className=""
                  src={`http://localhost:4000/uploads/${link}`}
                  alt="xx"
                />
                <button
                  type="button"
                  onClick={() => deletePhoto(link)}
                  className="absolute bottom-1 right-1 text-white font-bold bg-black p-2 bg-opacity-70 rounded-full"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => selectAsMainPhoto(link)}
                  className="absolute bottom-1 left-1 text-white font-bold bg-black p-2 bg-opacity-70 rounded-full"
                >
                  {addedPhotos[0] !== link && (
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
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                  )}
                  {addedPhotos[0] === link && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>                  
                  )}
                </button>
              </div>
            ))}
          <label
            type="button"
            className={`cursor-pointer border border-gray-300 rounded-2xl px-10 py-4 text-gray-500 flex gap-2`}
          >
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
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
          </label>
        </div>
        {inputTitle("Description")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {inputTitle("Perks")}
        <Perks selected={perks} onChange={setPerks} />
        {inputTitle("Extra Info")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {inputTitle("Check In & Out times")}
        <div className="flex gap-3">
          <div className="flex gap-2">
            <h3 className="text-red-600">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <h3 className="text-red-600">Check out time</h3>
            <input
              type="text"
              placeholder="18:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <h3 className="text-red-600">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <h3 className="text-red-600">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-primary my-4 p-4 flex justify-center gap-5 font-bold text-white rounded-full">
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
          <span>{id ? "Update the tour" : "Save the tour"}</span>
        </button>
      </form>
    </>
  );
};

export default PlacesForm;

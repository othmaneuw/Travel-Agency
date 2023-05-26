import axios from "axios";
import { useState,useContext } from "react";
import { TripContext } from "../context/TripContext";
import { Navigate } from "react-router-dom";

const SearchTrip = () => {
  const {setGlobalTrip} = useContext(TripContext);
  const [searchedTrip,setSearchedTrip] = useState('');
  const [redirect,setRedirect] = useState(false);
  const filterTripsBySearch = async () =>{
    const {data : allTrips} = await axios.get('/places');
    const searchedTrips = allTrips.filter(trip => trip.address.toLowerCase().includes(searchedTrip.toLocaleLowerCase()));
    console.log(searchedTrips);
    setGlobalTrip(searchedTrips);
    localStorage.setItem('trip',JSON.stringify(searchedTrips));
    setRedirect(true);
  }
  if(redirect){
    return <Navigate to='/searched-trips' />
  }
  return (
    <div className="flex gap-2">
      <input
        value={searchedTrip}
        onChange={(e)=>setSearchedTrip(e.target.value)}
        type="text"
        placeholder="Search the trip you're looking for"
        style={{
          border: "1px solid #f97316",
          width: "300px",
          height: "35px",
          borderRadius: "20px",
        }}
      />
      <button className="bg-primary rounded-full text-white p-3" onClick={filterTripsBySearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchTrip;

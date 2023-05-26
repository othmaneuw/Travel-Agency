import { useContext, useEffect } from "react";
import { TripContext } from "../context/TripContext";

const SearchedTrips = () =>{
    const {globalTrip} = useContext(TripContext);
    console.log('hello',globalTrip);
    return (
        <div>
            {globalTrip.map(trip => (
                <div>
                    {trip.title} 
                </div>
            ))}
        </div>
    );
}

export default SearchedTrips;
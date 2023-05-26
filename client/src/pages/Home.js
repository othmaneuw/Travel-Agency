import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchTrip from "../components/SearchTrip";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const getPlaces = async () => {
    const response = await axios.get("/places");
    setPlaces(response.data);
  };
  
  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div>
      <SearchTrip />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 mt-10">
            {places.length > 0 && places.map(place =>(
                <Link to={`/place/${place._id}`} key={place._id}>
                    <div className="mb-3">
                        <img width="350px" src={`http://localhost:4000/uploads/${place.photos[0]}`} alt={place.title} />
                    </div>
                    <h2 className="text-sm text-primary font-bold">{place.address}</h2>
                    <h3 className="text-gray-500 font-bold">{place.title}</h3>
                    <p><span className="text-blue-400 font-bold">{place.price} MAD</span> per person </p>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default Home;

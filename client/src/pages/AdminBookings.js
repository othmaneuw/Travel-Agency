import axios from "axios";
import { useEffect, useState } from "react";
import Booking from "../components/Booking";
import AccountNav from "../components/AccountNav";

const AdminBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [error,setError] = useState(false);
  const getAllBookings = async () => {
    setError(false);
    try {
      const response = await axios.get("/bookings", { withCredentials: true });
      setAllBookings(response.data);
    } catch (error) {
      console.log('error');
      setError(true);
    }
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  const h1Style = "text-primary font-bold text-center text-xl mt-20";
  if(error){
    return <h1 className={h1Style}>You're not authorized to access this page , it's for admins</h1>
  }
  if (allBookings.length === 0) {
    return <h1 className={h1Style}>No Bookings</h1>;
  }
  
  return (
    <div>
      {allBookings.length > 0 && (
        <div>
          <AccountNav />
          <h1 className={h1Style}>All Bookings ({allBookings.length}) </h1>
          {allBookings.map((booking) => (
            <Booking key={booking._id} booking={booking} admin={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

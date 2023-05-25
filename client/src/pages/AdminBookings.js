import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { format } from "date-fns";

const AdminBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [error, setError] = useState(false);
  const getAllBookings = async () => {
    setError(false);
    try {
      const response = await axios.get("/bookings", { withCredentials: true });
      setAllBookings(response.data);
    } catch (error) {
      console.log("error");
      setError(true);
    }
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  async function validateTrip(id){
    console.log(id);
    const response = await axios.put(`/bookings/${id}`);
    const newBookings = allBookings.filter(booking => booking._id !== id);
    //console.log(newBookings,response.data)
    setAllBookings([...newBookings,response.data]);
  }
  const h1Style = "text-primary font-bold text-center text-xl mt-20";
  if (error) {
    return (
      <h1 className={h1Style}>
        You're not authorized to access this page , it's for admins
      </h1>
    );
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
          {/* {allBookings.map((booking) => (
            <Booking key={booking._id} booking={booking} admin={true} />
          ))} */}
          <table className="styled-table">
            <thead>
              <tr>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Phone</th>
                <th>Trip</th>
                <th>User</th>
                <th>Total Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {allBookings.map((booking) => (
              <tbody>
                <tr>
                  <td>{format(new Date(booking.checkIn), "yyyy-MM-dd")}</td>
                  <td>{format(new Date(booking.checkOut), "yyyy-MM-dd")}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.place.title}</td>
                  <td>
                    {booking.user.name} ({booking.user.email}){" "}
                  </td>
                  <td>{booking.price} MAD</td>
                  <td style={{
                    color : booking.status === 'valid' ? '#22c55e' : '#f97316',
                    fontWeight: 'bolder'
                  }}>{booking.status}</td>
                  <td>
                    <button className="bg-green-500 text-white font-bold p-1" onClick={()=>validateTrip(booking._id)}>
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
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    <button className="bg-red-500 text-white font-bold p-1">
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
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

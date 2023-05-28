import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { format } from "date-fns";
import SearchTrip from "../components/SearchTrip";

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
  async function updateStatus(id, status) {
    console.log(id);
    const response = await axios.put(`/bookings/${id}`, { status });
    const newBookings = allBookings.filter((booking) => booking._id !== id);
    //console.log(newBookings,response.data)
    setAllBookings([...newBookings, response.data]);
  }
  async function deleteBooking(id){
    const response = await axios.delete(`/bookings/${id}`);
    setAllBookings(response.data);
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
      <SearchTrip />
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
                  <td
                    style={{
                      color:
                        booking.status === "valid"
                          ? "#22c55e"
                          : booking.status === "canceled"
                          ? "red"
                          : "#f97316",
                      fontWeight: "bolder",
                    }}
                  >
                    {booking.status}
                  </td>
                  <td>
                    <button
                      className="bg-green-500 text-white font-bold p-1"
                      onClick={() => updateStatus(booking._id, "valid")}
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
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-red-500 text-white font-bold p-1"
                      onClick={() => updateStatus(booking._id, "canceled")}
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
                    </button>
                    <button className="bg-violet-400 text-white font-bold p-1" onClick={()=>deleteBooking(booking._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
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

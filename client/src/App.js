import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/Account";
import Places from "./components/Places";
import PlacesForm from "./pages/PlacesForm";
import SinglePlace from "./pages/SinglePlace";
import Bookings from "./pages/Bookings";
import SingleBooking from "./pages/SingleBooking";
import AdminBookings from "./pages/AdminBookings";
import { TripContextProvider } from "./context/TripContext";
import SearchedTrips from "./pages/SearchedTrips";
import AdminReviews from "./pages/AdminReviews";
import SingleReview from "./pages/SingleReview";


axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <div>
      <TripContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/places" element={<Places />} />
              <Route path="/account/places/new" element={<PlacesForm />} />
              <Route path="/account/places/:id" element={<PlacesForm />} />
              <Route path="/place/:id" element={<SinglePlace />} />
              <Route path="/account/bookings" element={<Bookings />} />
              <Route path="/account/bookings/:id" element={<SingleBooking />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/searched-trips" element={<SearchedTrips />} />
              <Route path="/account/reviews" element={<AdminReviews />}  />
              <Route path="/account/reviews/:id" element={<SingleReview />}  />
            </Route>
          </Routes>
        </UserContextProvider>
      </TripContextProvider>
    </div>
  );
}

export default App;

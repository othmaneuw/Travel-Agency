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

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/places' element={<Places />} />
            <Route path='/account/places/new' element={<PlacesForm />} />
            <Route path="/account/places/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<SinglePlace />} />
            <Route path="/account/bookings" element={<Bookings />}  />
            <Route path="/account/bookings/:id" element={<SingleBooking />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;

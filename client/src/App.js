import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/Account";

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
            <Route path='/account/:subpage?' element={<Account />} />
            <Route path='/account/:subpage/:action' element={<Account />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;

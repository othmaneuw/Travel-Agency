import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import SearchTrip from "../components/SearchTrip";

const Account = () => {
  const { user, ready, setUser } = useContext(UserContext);
  console.log(user);
  const [redirect, setRedirect] = useState(false);
  

 

  const logout = async () => {
    const response = await axios.post("/logout",{},{withCredentials:true});
    setUser(null);
    setRedirect(true);
    console.log(response.data);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (!user && ready) {
    return <Navigate to="/login" />;
  }

  if (!ready) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <SearchTrip />
      <AccountNav />
        <div className="text-center mt-8">
          <p className="text-center">
            Logged in as <span className="text-primary">{user.name} ({user.email})</span>
          </p>
          <button className="bg-primary py-3 px-20 rounded-full text-white font-bold max-w-sm mt-6" onClick={logout}>
            Logout
          </button>
        </div>
    </div>
  );
};

export default Account;

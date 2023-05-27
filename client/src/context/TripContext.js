import { createContext, useEffect, useState } from "react";

export const TripContext = createContext({});

export const TripContextProvider = ({ children }) => {
  const [globalTrip, setGlobalTrip] = useState([]);
  useEffect(() => {
    const trip = JSON.parse(localStorage.getItem("trip"));
    setGlobalTrip(trip);
  }, []);
  return (
    <TripContext.Provider value={{ globalTrip, setGlobalTrip }}>
      {children}
    </TripContext.Provider>
  );
};

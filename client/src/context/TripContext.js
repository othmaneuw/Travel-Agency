import { createContext, useEffect, useState } from "react";

export const TripContext = createContext({});

export const TripContextProvider = ({ children }) => {
  const [globalTrip, setGlobalTrip] = useState([]);
  useEffect(() => {
    console.log('hey',globalTrip);
  }, []);
  return (
    <TripContext.Provider value={{ globalTrip, setGlobalTrip }}>
      {children}
    </TripContext.Provider>
  );
};

"use client";
import { createContext, useState } from "react";

export const CityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [city, setCity] = useState(null);

  function refreshCityState(data) {
    setCity(data);
  }

  return (
    <CityContext.Provider value={{ city, refreshCityState }}>
      {children}
    </CityContext.Provider>
  );
};

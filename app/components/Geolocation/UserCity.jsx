"use client";
import React, { useState, useEffect, useContext } from "react";
import { CityContext } from "../../context/geoLocationContext";
const UserCity = ({ lat, lng }) => {

  const [city, setCity] = useState("");
  const { refreshCityState } = useContext(CityContext);

  const getUserCity = async () => {
    const getLocation = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
    );
    const location = await getLocation.json();
    const city = location.results[0].components.city;
    setCity(city);
    refreshCityState(city);
  };

  useEffect(() => {
    getUserCity();
  }, []);
  console.log(city);

  return;
};

export default UserCity;

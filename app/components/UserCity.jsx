"use client";
import React, { useState, useEffect } from "react";

const UserCity = ({ lat, lng }) => {
  const [city, setCity] = useState("");

  const getUserCity = async () => {
    const getLocation = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
    );
    const location = await getLocation.json();
    const city = location.results[0].components.city;
    setCity(city);
  };

  useEffect(() => {
    getUserCity();
  }, []);

  return (
    <div>
      <h2>{city}</h2>
    </div>
  );
};

export default UserCity;

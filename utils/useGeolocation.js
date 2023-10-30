"use client";
import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const navigator = window.navigator;

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [navigator.geolocation]);

  const onError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  const onSuccess = (location) => {
    const { latitude, longitude } = location.coords;
    setCoordinates({ lat: latitude, lng: longitude });
    setLoading(false);
  };

  const getUserCity = async () => {
    try {
      const { lat, lng } = coordinates;
      if (lat && lng) {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch city data");
        }
        const location = await response.json();
        const city = location.results[0].components.town;
        console.log(city);
        setCity(city);
      }
    } catch (error) {
      setError("Error fetching user city");
    }
  };

  useEffect(() => {
    if (coordinates) {
      getUserCity();
    }
  }, [coordinates]);

  return city;
};

export default useGeolocation;

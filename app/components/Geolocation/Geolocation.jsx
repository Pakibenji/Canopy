"use client";
import React, { useCallback, useEffect, useState } from "react";
import UserCity from "./UserCity";

const Geolocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onSuccess = useCallback(
    (location) => {
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLoading(false);
    },
    [setCoordinates, setLoading]
  );

  const onError = useCallback(
    (error) => {
      setError(error);
      setLoading(false);
    },
    [setError, setLoading]
  );

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onSuccess, onError]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <UserCity lat={coordinates.lat} lng={coordinates.lng} />
      )}
    </>
  );
};

export default Geolocation;

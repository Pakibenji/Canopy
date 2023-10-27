"use client";
import React, { useCallback, useEffect, useState } from "react";
import UserCity from "./UserCity";

const Geolocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserPermission = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          showLocation();
        }
        if (result.state === "denied") {
          setError("Location permission denied");
        }
        result.onchange = () => {
          if (result.state === "granted" || result.state === "prompt") {
            showLocation();
          }
          if (result.state === "denied") {
            setError("Location permission denied");
          }
        };
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const showLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

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
    getUserPermission();
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

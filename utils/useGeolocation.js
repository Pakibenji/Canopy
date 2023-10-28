import { useCallback, useEffect, useState, useContext } from "react";
import { CityContext } from "@/app/context/geoLocationContext";

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const { refreshCityState } = useContext(CityContext);

  const getUserPermission = async () => {
    await navigator.permissions
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

  const getUserCity = async () => {
    const getLocation = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
    );
    const location = await getLocation.json();
    const city = location.results[0].components.city;
    setCity(city);
    refreshCityState(city);
  };

  const { lat, lng } = coordinates;
  useEffect(() => {
    if (lat && lng) {
      getUserCity();
    }
  }, [lat, lng]);

  return { city };
};

export default useGeolocation;

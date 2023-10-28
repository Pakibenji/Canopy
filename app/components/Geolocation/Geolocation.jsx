'use client';
import React from "react";
import useGeolocation from "@/utils/useGeolocation";

const Geolocation = () => {
  const {city } = useGeolocation();
}

export default Geolocation;
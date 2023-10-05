"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserPlants = () => {
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const userId = session?.user?._id;

  return (
    <>
      <h3>My Plants</h3>
    </>
  );
};

export default UserPlants;

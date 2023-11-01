"use client";
import { useState } from "react";

const useCrud = (apiUrl) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setData(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const createItem = async (itemData) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      return json;
    } catch (error) {
      setError(error);
    }
  };

  const updateItem = async (itemId, itemData) => {
    try {
      const res = await fetch(`${apiUrl}/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      return json;
    } catch (error) {
      setError(error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const res = await fetch(`${apiUrl}/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw Error("Failed to delete item");
      return itemId;
    } catch (error) {
      setError(error);
    }
  };

  return {
    data,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    isLoading,
    error,
    message,
  };
};

export default useCrud;

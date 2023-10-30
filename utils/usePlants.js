import useCrud from "./useCrud";

const usePlants = (action) => {
  if (action === "getAllPlants") return useCrud("/api/plants/all");
  if (action === "getMyPlants") return useCrud("/api/plants/myplants");
  if (action === "createPlant") return useCrud("/api/plants/new");
  if (action === "deletePlant") return useCrud("/api/plants/delete");
  if (action === "editPlant") return useCrud("/api/plants/edit");

  const toggleToBarter = async (plant, isToBarter) => {
    const { _id } = plant;
    const res = await fetch(`/api/plants/edit/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toBarter: !isToBarter }),
    });
    if (res.ok) return "plant updated";
    throw Error("Failed to update plant");
  };
  return {
    toggleToBarter
  };
};

export default usePlants;

import useCrud from "./useCrud";

const usePlants = (action) => {
    if (action === "getAllPlants") return useCrud("/api/plants/all");
    if (action === "getMyPlants") return useCrud("/api/plants/myplants");
    if (action === "createPlant") return useCrud("/api/plants/new");
    if (action === "deletePlant") return useCrud("/api/plants/delete");
};

export default usePlants;
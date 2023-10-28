export const handleToEditPlantPage = (plant, router) => {
    const { _id } = plant;
    router.push(`/plants/${_id}/edit`);
  };

  export const editPlant = async (plantData, plantId) => {
    try {
      const response = await fetch(`/api/plants/edit/${plantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        return "Plant successfully edited!";
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to edit plant");
    }
  };

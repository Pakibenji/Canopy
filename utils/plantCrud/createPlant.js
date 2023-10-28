export const handleAddPlant = (router) => {
    router.push("/plants/add");
  };

  export const createPlant = async (plantData) => {
    try {
      const res = await fetch("/api/plants/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
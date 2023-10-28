export const toggleToBarter = async (plant, isToBarter, router) => {
    const { _id } = plant;
    const res = await fetch(`/api/plants/edit/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toBarter: !isToBarter }),
    });
    if (res.status === 200) {
      alert("Plant edited successfully");
      router.push("/");
    } else {
      alert("Plant could not be edited");
    }
  };

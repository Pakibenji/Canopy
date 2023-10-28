export const deletePlant = async (plant, router) => {
    const { _id } = plant;
    if (confirm("Are you sure you want to delete this plant?")) {
      const res = await fetch(`/api/plants/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("Plant deleted successfully");
        router.push("/");
      } else {
        alert("Plant could not be deleted");
      }
    }
  };
import React from "react";
import DisplayPlant from "@/app/components/DisplayPlant";

const page = async ({ params }) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/plants/${id}`);
  const plant = await data.json();
  return <>
    <DisplayPlant plant={plant} />
  </>;
};

export default page;

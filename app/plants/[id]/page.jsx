import React from "react";
import DisplayPlant from "@/app/components/DisplayPlant";
import Header from "@/app/components/Header";
import styles from '../../page.module.css'
import { subTitle } from "@/app/fonts";

const PlantDetailPage = async ({ params }) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/plants/${id}`);
  const plant = await data.json();
  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>Plant Detail</h2>
      <DisplayPlant plant={plant} />
    </>
  );
};

export default PlantDetailPage

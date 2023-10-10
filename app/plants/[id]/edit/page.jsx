import Header from '@/app/components/Header'
import React from 'react'
import styles from '@/app/page.module.css'
import { subTitle } from '@/app/fonts'
import PlantForm from '@/app/components/PlantForm'
import EditPlantForm from '@/app/components/EditPlantForm'

const EditPlantPage = async ({params}) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/plants/${id}`);
  const plant = await data.json();
  console.log(plant)
  return (
    <><Header />
     <h2 style={subTitle.style} className={styles.pageTitle}>
        Edit Plant
      </h2>
      <EditPlantForm plant={plant} />
    </>
  )
}

export default EditPlantPage
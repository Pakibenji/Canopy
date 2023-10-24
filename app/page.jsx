import AddPlantButton from "./components/AddPlantButton";
import AllPlants from "./components/AllPlants";
import Geolocation from "./components/Geolocation/Geolocation";

export default function Home() {
  return (
    <>
      <Geolocation />
      <AddPlantButton />
      <AllPlants />
    </>
  );
}

import AddPlantButton from "./components/AddPlantButton";
import AllPlants from "./components/AllPlants";
import Header from "./components/Header";
import Geolocation from "./components/Geolocation";

export default function Home() {
  return (
    <>
      <Header />
      <Geolocation />
      <AddPlantButton />
      <AllPlants />
    </>
  );
}

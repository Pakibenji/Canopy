import AddPlantButton from "./components/AddPlantButton";
import AllPlants from "./components/AllPlants";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <AddPlantButton />
      <AllPlants />
    </>
  );
}

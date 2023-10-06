import AddPlant from "./components/AddPlant";
import AllPlants from "./components/AllPlants";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <AddPlant />
      <AllPlants />
    </>
  );
}

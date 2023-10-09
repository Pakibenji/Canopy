async function fetchPlant(id) {
  const URL = `http://localhost:3000/api/plants/`;
  const res = await fetch(`${URL}/${id}`);
  const plant = res.json();
  return plant;
}

export default async function Page({ params }) {
  const { id } = params;
  const plant = await fetchPlant(id);
  return <main className="main">
    {JSON.stringify(plant)}
  </main>;
}

import UserDetail from "../../components/UserDetail";
import Header from "../../components/Header";
import styles from "@/app/page.module.css"
import { subTitle } from "../../fonts";
import UserPlants from "../../components/UserPlants";


const Dashboard = async ({params}) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/user/${id}`);
  const user = await data.json();


  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>Dashboard</h2>
      <UserDetail user={user}/>
      <UserPlants  />
    </>
  );
}

export default Dashboard

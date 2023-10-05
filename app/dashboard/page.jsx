import UserInfo from "../components/UserInfo";
import Header from "../components/Header";
import styles from "../page.module.css";
import { subTitle } from "../fonts";
import UserPlants from "../components/UserPlants";

const Dashboard = () => {
  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>Dashboard</h2>
      <UserInfo />
      <UserPlants />
    </>
  );
}

export default Dashboard

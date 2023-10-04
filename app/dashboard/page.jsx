import UserInfo from "../components/UserInfo";
import Header from "../components/Header";
import styles from "../page.module.css";
import { subTitle } from "../fonts";

const Dashboard = () => {
  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>Dashboard</h2>
      <UserInfo />
    </>
  );
}

export default Dashboard

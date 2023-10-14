import UserDetail from "../../components/UserDetail";
import Header from "../../components/Header";
import styles from "@/app/page.module.css";
import { subTitle } from "../../fonts";
import UserPlants from "../../components/UserPlants";
import Geolocation from "../../components/Geolocation";
import { getNextServerSession } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { isUserSession } from "@/utils/helpers";

const Dashboard = async ({ params }) => {
  const { id } = params;
  const getUser = await fetch(`${process.env.API_URL}/api/user/${id}`);
  const user = await getUser.json();

  const getSession = await getNextServerSession();
  const sessionUserId = await getSession?.user?._id;

  const isUser = isUserSession(
    sessionUserId,
    id,
    redirect,
    `/dashboard/${sessionUserId}`
  );

  return (
    <>
      <Header />
      <Geolocation />
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Dashboard
      </h2>
      <UserDetail user={user} />
      <UserPlants />
    </>
  );
};

export default Dashboard;

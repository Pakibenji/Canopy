'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import styles from "./Header.module.css";
import { subTitle } from "../fonts";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session} = useSession();
  const name = session?.user?.name;

  function isConnected()  {
    if (name) {
      return (
        <nav style={subTitle.style} className={styles.nav}>
          <Link href="/dashboard"> Dashboard </Link>
        </nav>
      );
    }
  }
  function isNotConnected() {
    if (!name) {
      return (
        <nav style={subTitle.style} className={styles.nav}>
          <Link href="/register"> Register </Link>
          <Link href="/login"> Login </Link>
        </nav>
      );
    }
  }
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="Jardin Calme" width={150} height={80} priority />
      </Link>
      {isConnected()}
      {isNotConnected()}
    </header>
  );
}
 export default Header;
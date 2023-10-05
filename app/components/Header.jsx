"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import styles from "./Header.module.css";
import { subTitle } from "../fonts";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  function buttonDisplay() {
    if (session) {
      return isConnected();
    }
    return isNotConnected();
  }

  function isConnected() {
    return (
      <nav style={subTitle.style} className={styles.nav}>
        <Link href="/dashboard"> Dashboard </Link>
      </nav>
    );
  }
  function isNotConnected() {
    return (
      <nav style={subTitle.style} className={styles.nav}>
        <Link href="/register"> Register </Link>
        <Link href="/login"> Login </Link>
      </nav>
    );
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="Jardin Calme" width={150} height={80} priority />
      </Link>
      {buttonDisplay()}
    </header>
  );
};
export default Header;

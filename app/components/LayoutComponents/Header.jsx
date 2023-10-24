'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo21.png";
import styles from "./Header.module.css";
import { subTitle } from "../../fonts";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import IsLoading from "../IsLoading";

const Header = () => {
  const { data: session, status, error } = useSession({ fallback: <IsLoading /> });
  const userId = session?.user?._id;

  const isConnected = useMemo(() => {
    return (
      <nav style={subTitle.style} className={styles.nav}>
        <Link href={`/dashboard/${userId}`}> Dashboard </Link>
      </nav>
    );
  }, [userId]);

  const isNotConnected = useMemo(() => {
    return (
      <nav style={subTitle.style} className={styles.nav}>
        <Link href="/register"> Register </Link>
        <Link href="/login"> Login </Link>
      </nav>
    );
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={logo} alt="Jardin Calme"/>
      </Link>
      {session ? isConnected : isNotConnected}
    </header>
  );
};

export default Header;

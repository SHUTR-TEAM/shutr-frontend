"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const MobileNavbar = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarTop}>
        <Image
          src={"/logo-black.png"}
          className={styles.navbarLogo}
          width={135}
          height={50}
          alt="SHUTR Logo"
        />

        <HiMenuAlt3
          className={styles.menuIcon}
          onClick={() => setIsPanelOpen(true)}
        />
      </div>

      <div
        className={`${styles.navbarPanel} ${
          isPanelOpen ? "" : styles.navbarPanelHidden
        }`}
      >
        <IoClose
          className={styles.closeIcon}
          onClick={() => setIsPanelOpen(false)}
        />
        <hr />
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            Find a Photographer
          </Link>
          <Link href="/about" className={styles.navLink}>
            About Us
          </Link>
          <Link href="/about" className={styles.navLink}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;

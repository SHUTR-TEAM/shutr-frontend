import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";

const DesktopNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <Image
        src={"/logo-black.png"}
        className={styles.navbarLogo}
        width={135}
        height={50}
        alt="SHUTR Logo"
      />

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

      <div className={styles.navLinks}>
        <button className="secondary-btn">Sign In</button>
        <button className="primary-btn">Register</button>
      </div>
    </nav>
  );
};

export default DesktopNavbar;

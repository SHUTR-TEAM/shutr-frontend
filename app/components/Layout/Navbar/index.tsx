import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className={styles.logoImage}
        />
        <span className={styles.logoText}>SHUTR</span>
      </div>
      <div className={styles.searchContainer}>
        <span>
          <i className="bx bx-search" id="search-icon"></i>
        </span>
        <input type="text" placeholder="Search" className={styles.searchBar} />
      </div>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About Us
        </Link>
        <button className={styles.signupBtn}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

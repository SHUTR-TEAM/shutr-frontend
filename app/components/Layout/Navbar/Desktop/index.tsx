"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./index.module.css";
import { ChevronDown } from "lucide-react";
import { LuCalendarRange, LuMessageSquareText, LuUser } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";

const DesktopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          src={"/logo-black.png"}
          className={styles.navbarLogo}
          width={135}
          height={50}
          alt="SHUTR Logo"
        />
      </Link>

      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/maintenance" className={styles.navLink}>
          Find a Photographer
        </Link>
        <Link href="/#about" className={styles.navLink}>
          About Us
        </Link>
        {/* <Link href="/about" className={styles.navLink}>
          Contact
        </Link> */}
      </div>

      {/* <div className={styles.navLinks}>
        <Link href={"/maintenance"} className="secondary-btn">
          Sign In
        </Link>
        <Link href={"/maintenance"} className="primary-btn">
          Register
        </Link>
      </div> */}

      <div className={styles.profileWrapper}>
        <div
          className={styles.profile}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Pabodha</span>
          <Image
            src={"/team/pabodha.jpg"}
            className={styles.avatar}
            width={40}
            height={40}
            alt="User Avatar"
          />
          <ChevronDown />
        </div>

        <ul
          className={`${styles.dropdown} ${
            isDropdownOpen ? "" : styles.hidden
          }`}
        >
          <li>
            <LuUser className={styles.icon} />
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <LuCalendarRange className={styles.icon} />
            <Link href="/profile">Calendar</Link>
          </li>
          <li>
            <LuMessageSquareText className={styles.icon} />
            <Link href="/profile">Messages</Link>
          </li>
          <hr className={styles.hr} />
          <li className={styles.logout}>
            <IoMdLogOut className={styles.icon} />
            <Link href="/profile">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavbar;

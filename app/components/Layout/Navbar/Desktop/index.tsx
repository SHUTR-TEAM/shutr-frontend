"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./index.module.css";
import { ChevronDown } from "lucide-react";
import { LuCalendarRange, LuMessageSquareText, LuUser } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useLogoutMutation } from "@/app/redux/features/auth/authApiSlice";
import { logout } from "@/app/redux/features/auth/authSlice";

const DesktopNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const [logoutApi] = useLogoutMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await logoutApi({}).unwrap();

      // Update Redux state after successful logout
      dispatch(logout());

      // Optionally redirect to login page
      // router.push('/login');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
        <Link href="/Search" className={styles.navLink}>
          Find a Photographer
        </Link>
        <Link href="/#about" className={styles.navLink}>
          About Us
        </Link>
        {/* <Link href="/about" className={styles.navLink}>
          Contact
        </Link> */}
      </div>

      {user ? (
        <div className={styles.profileWrapper}>
          <div
            className={styles.profile}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{user.first_name}</span>
            <Image
              src={
                user.profile_image_url ? user.profile_image_url : "/avatar.jpeg"
              }
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
              <Link href="/calendar">Calendar</Link>
            </li>
            <li>
              <LuMessageSquareText className={styles.icon} />
              <Link href="/chat">Messages</Link>
            </li>
            <hr className={styles.hr} />
            <li className={styles.logout} onClick={handleLogout}>
              <IoMdLogOut className={styles.icon} />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.navLinks}>
          <Link href={"/signin"} className="secondary-btn">
            Sign In
          </Link>
          <Link href={"/signup"} className="primary-btn">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default DesktopNavbar;

import React from "react";
// import styles from "./index.module.css";
import DesktopNavbar from "./Desktop";
import MobileNavbar from "./Mobile";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;

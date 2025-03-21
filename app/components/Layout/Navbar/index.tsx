"use client";

import React from "react";
import DesktopNavbar from "./Desktop";
import MobileNavbar from "./Mobile";
import { useInitializeAuth } from "../../Auth/hooks/useInitializeAuth";

const Navbar = () => {
  useInitializeAuth();

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;

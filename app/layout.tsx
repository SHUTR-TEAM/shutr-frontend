import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import styles from "./layout.module.css";
//import Footer from "./components/Layout/Footer";
import StoreProvider from "./redux/StoreProvider";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

// const geologicaSans = localFont({
//   src: "./fonts/Geologica.ttf",
//   variable: "--font-geologica-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "SHUTR",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <div className={styles.children}>{children}</div>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Layout/Navbar";
import styles from "./layout.module.css";
import Footer from "./components/Layout/Footer";
import StoreProvider from "./redux/StoreProvider";

const geologicaSans = localFont({
  src: "./fonts/Geologica.ttf",
  variable: "--font-geologica-sans",
  weight: "100 900",
});

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
      <body className={geologicaSans.variable}>
        <Navbar />
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  );
}

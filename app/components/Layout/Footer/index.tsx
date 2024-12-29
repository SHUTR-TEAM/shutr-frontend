import Link from "next/link";
import React from "react";
import styles from "./index.module.css";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContentWrapper}>
        <Image src={"/logo-hor.png"} width={135} height={40} alt="SHUTR Logo" />

        <div className={styles.footerContent}>
          <div className={styles.photographerSignup}>
            <div className={styles.photographerSignupContent}>
              <h3>Are you a photographer?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                architecto vitae nemo
              </p>
            </div>
            <Link className={styles.signupBtn} href="/signup">
              Sign up
            </Link>
          </div>

          <div className={styles.footerLinksWrapper}>
            <h4>Explore</h4>
            <div className={styles.footerLinks}>
              <Link href="">Home</Link>
              <Link href="">About Us</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>

          <div className={styles.footerLinksWrapper}>
            <h4>Policies</h4>
            <div className={styles.footerLinks}>
              <Link href="">Terms & Conditions</Link>
              <Link href="">Privacy Policy</Link>
            </div>
          </div>

          <div className={styles.footerLinksWrapper}>
            <h4>Follow Us</h4>
            <div className={styles.footerSocialLinks}>
              <Link href="">
                <FaFacebook />
              </Link>
              <Link href="">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Copyright © 2024 SHUTRCO. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

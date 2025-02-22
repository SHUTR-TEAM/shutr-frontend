import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import styles from "./index.module.css";
import Image from "next/image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Pabodha Pathirana",
      role: "Full Stack Developer",
      description:
        '"Experienced developer dedicated to building accessible and user-friendly platforms."',
      image: "/pic1.png",
      socials: [
        {
          url: "https://linkedin.com",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://twitter.com",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "John Doe",
      role: "Frontend Developer",
      description:
        '"Experienced developer dedicated to building accessible and user-friendly platforms."',
      image: "/pic2.png",
      socials: [
        {
          url: "https://linkedin.com",
          icon: <FaLinkedin />,
        },
        {
          url: "https://twitter.com",
          icon: <FaLinkedin />,
        },
      ],
    },
    {
      name: "Jane Doe",
      role: "Backend Developer",
      description:
        '"Experienced developer dedicated to building accessible and user-friendly platforms."',
      image: "/pic3.png",
      socials: [
        {
          url: "https://linkedin.com",
          icon: <FaLinkedin />,
        },
        {
          url: "https://twitter.com",
          icon: <FaLinkedin />,
        },
      ],
    },
  ];
  return (
    <section>
      <div className={`boxWrapper ${styles.teamSection}`}>
        <h3>Meet the Team Behind SHUTR</h3>
        <div className={styles.teamMembers}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <Image
                src={member.image}
                height={300}
                width={400}
                alt={member.name}
                className={styles.memberImage}
              />
              <div className={styles.memberInfo}>
                <div>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
                <p>{member.description}</p>
                <div className={styles.socials}>
                  {member.socials.map((social, index) => (
                    <Link href={social.url} key={index}>
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

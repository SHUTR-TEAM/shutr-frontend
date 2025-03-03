import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import styles from "./index.module.css";
import Image from "next/image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Pabodha Pathirana",
      role: "Co-Founder",
      description:
        '"Experienced developer dedicated to building accessible and user-friendly platforms."',
      image: "/team/pabodha.jpg",
      socials: [
        {
          url: "https://linkedin.com/in/pabodha",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/pabodha-0",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "Pehesara Wijethunga",
      role: "Co-Founder",
      description:
        '"Committed to developing seamless and accessible solutions that enhance user interactions."',
      image: "/team/pehesara.jpg",
      socials: [
        {
          url: "https://www.linkedin.com/in/thasitha-wijethunga-574b26295",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/ThasithaWijethunga",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "Dinuka Induwara",
      role: "Co-Founder",
      description:
        '"Passionate about crafting intuitive and inclusive digital experiences that empower users."',
      image: "/team/dinuka.jpg",
      socials: [
        {
          url: "https://www.linkedin.com/in/dinuka-induwara",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/DInduwara",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "Pamudi Rajapaksha",
      role: "Co-Founder",
      description:
        '"Creative  developer dedicated to crafting visually appealing and user-friendly web experiences."',
      image: "/team/pamudi.jpg",
      socials: [
        {
          url: "https://www.linkedin.com/in/pamudi-rajapaksha-59ab1a338",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/Pamudi-Rajapakha",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "Chamindu Dharmawickrema",
      role: "Co-Founder",
      description:
        '"Experienced developer dedicated to building scalable, efficient, and user-friendly applications across the stack."',
      image: "/team/chamindu.jpg",
      socials: [
        {
          url: "https://linkedin.com/in/chamindu-dharmawickrema-066295312",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/Chamindu-Dharmawickrema",
          icon: <FaGithub />,
        },
      ],
    },
    {
      name: "Sashan Fernando",
      role: "Co-Founder",
      description:
        '"Passionate developer committed to creating innovative, efficient, and user-centric solutions."',
      image: "/team/sashan.jpg",
      socials: [
        {
          url: "https://www.linkedin.com/in/sashan-fernando-b91a71235",
          icon: <FaLinkedinIn />,
        },
        {
          url: "https://github.com/Sashan2002",
          icon: <FaGithub />,
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
                    <Link href={social.url} key={index} target="_blank">
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

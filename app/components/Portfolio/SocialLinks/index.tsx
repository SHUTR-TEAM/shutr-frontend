"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Edit2 } from "lucide-react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  getSocialLinksByPhotographer,
  updateSocialLinks,
} from "@/app/redux/features/portfolio";
import { usePathname } from "next/navigation";

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

const SocialLinks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const participantId = pathname.split("/").pop();

  useEffect(() => {
    if (participantId) {
      dispatch(getSocialLinksByPhotographer({ portfolioID: participantId }));
    }
  }, [dispatch, participantId]);

  const activeSocialLinks = useSelector(
    (state: RootState) => state.portfolio.activeSocialLinks
  );

  const socialLinks = activeSocialLinks?.data ?? {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const [tempLinks, setTempLinks] = useState<SocialLinks>(
    socialLinks ?? { facebook: "", instagram: "", twitter: "", linkedin: "" }
  );

  useEffect(() => {
    if (activeSocialLinks?.data) {
      setTempLinks(activeSocialLinks.data);
    }
  }, [activeSocialLinks]);

  const handleSaveChanges = async () => {
    // Dispatch Redux action to save updated social links to backend
    if (participantId) {
      await dispatch(
        updateSocialLinks({
          portfolioID: participantId,
          socialLinks: tempLinks,
        })
      );

      dispatch(getSocialLinksByPhotographer({ portfolioID: participantId }));
    }

    // After saving the changes, fetch the updated social links from the backend

    setShowEditModal(false); // Close the modal
  };

  const renderSocialIcon = (
    platform: keyof SocialLinks,
    Icon: typeof Facebook
  ) => {
    const url = socialLinks[platform];
    const capitalizedPlatform =
      platform.charAt(0).toUpperCase() + platform.slice(1);

    return url ? (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconLink}
        aria-label={capitalizedPlatform}
      >
        <Icon className={styles.icon} />
      </Link>
    ) : (
      <div
        className={`${styles.iconLink} ${styles.disabled}`}
        data-tooltip={`Photographer hasn't added their ${capitalizedPlatform} profile yet`}
      >
        <Icon className={styles.icon} />
      </div>
    );
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={styles.connect}>
      <div className={styles.TopicAndButton}>
        <h3 className={styles.title}>Connect with me</h3>
        {user?.role == "photographer" && user.portfolio.id == participantId && (
          <button
            onClick={() => setShowEditModal(true)}
            className={styles.editButton}
          >
            <Edit2 size={20} />
          </button>
        )}
      </div>

      <div className={styles.socialIcons}>
        {renderSocialIcon("facebook", Facebook)}
        {renderSocialIcon("instagram", Instagram)}
        {renderSocialIcon("twitter", Twitter)}
        {renderSocialIcon("linkedin", Linkedin)}
      </div>

      {/* Custom Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Edit Social Links</h2>

            <div className={styles.inputGroup}>
              <label>Facebook URL</label>
              <input
                type="text"
                placeholder={socialLinks.facebook}
                onChange={(e) =>
                  setTempLinks({ ...tempLinks, facebook: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Instagram URL</label>
              <input
                type="text"
                placeholder={socialLinks.instagram}
                onChange={(e) =>
                  setTempLinks({ ...tempLinks, instagram: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Twitter URL</label>
              <input
                type="text"
                placeholder={socialLinks.twitter}
                onChange={(e) =>
                  setTempLinks({ ...tempLinks, twitter: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>LinkedIn URL</label>
              <input
                type="text"
                placeholder={socialLinks.linkedin}
                onChange={(e) =>
                  setTempLinks({ ...tempLinks, linkedin: e.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handleSaveChanges} className={styles.saveButton}>
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className={styles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinks;

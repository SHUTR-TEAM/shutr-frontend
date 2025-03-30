"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import {
  getByIdportfolio,
  updateByIdportfolio,
} from "@/app/redux/features/portfolio";
import styles from "./index.module.css";

import GallerySection from "./GallerySection";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

// import Calendar from "./Calendar/calendar";
import { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import { Edit2 } from "lucide-react";
import Packages from "./Packages/packages";
import SocialLinks from "./SocialLinks";
import { LoadingSpinner } from "./LoadingSpinner";
import CustomerReviews from "./CustomerReviews";
import { usePathname } from "next/navigation";
import Calendar from "react-calendar";
import { getDisabledBookings } from "@/app/redux/features/booking";

const Portfolio = () => {
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();
  const portfolioId = pathname.split("/").pop();

  useEffect(() => {
    // fetch by id portfolio
    if (portfolioId) {
      dispatch(getByIdportfolio({ participantId: portfolioId }));
    }
  }, [dispatch, portfolioId]);

  const activePortfolio = useSelector(
    (state: RootState) => state.portfolio.activePortfolio
  ) || { results: [] };
  // const activeReview = useSelector((state: RootState) => state.portfolio.activeReview) || { results: [] };

  console.log("active portfolio : ", activePortfolio);

  const Profile = activePortfolio?.data;
  // const Review = activeReview?.data;

  const [updatedName, setUpdatedName] = useState(
    Profile?.photographer?.first_name +
      " " +
      Profile?.photographer?.last_name || ""
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    Profile?.description || ""
  );

  const [tempName, setTempName] = useState(updatedName);
  const [tempDescription, setTempDescription] = useState(updatedDescription);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Update state when Profile data changes
    if (Profile) {
      setUpdatedName(
        Profile?.photographer?.first_name +
          " " +
          Profile?.photographer?.last_name
      );
      setUpdatedDescription(Profile?.description);
    }
  }, [Profile]);

  useEffect(() => {
    if (activePortfolio.data?.photographer?.id) {
      dispatch(
        getDisabledBookings({
          photographerId: activePortfolio.data?.photographer?.id,
          yearMonth: "",
        })
      );
    }
  });

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", tempName || updatedName);
      formData.append("description", tempDescription || updatedDescription);

      // Dispatch update action
      if (portfolioId) {
        dispatch(
          updateByIdportfolio({ formData, participantId: portfolioId })
        ).unwrap();
      }

      // Fetch updated portfolio data
      if (portfolioId) {
        dispatch(getByIdportfolio({ participantId: portfolioId }));
      }

      // Update the main state after saving
      setUpdatedName(tempName || updatedName);
      setUpdatedDescription(tempDescription || updatedDescription);

      // Close modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update portfolio:", error);
      alert("An error occurred while updating.");
    }
  };

  // const disabledDates = [new Date(2025, 2, 15), new Date(2025, 2, 20)];

  const user = useSelector((state: RootState) => state.auth.user);
  const disabledDates = useSelector(
    (state: RootState) => state.booking.activeDisabledBookings.data
  );

  return (
    <>
      <main className={styles.portfolio}>
        <div className={styles.banner}>
          <div>
            {Profile ? (
              <div key={Profile?.id}>
                <ProfileHeader
                  id={Profile?.id}
                  name={updatedName}
                  coverImageUrl={
                    Profile?.Background_image_url
                      ? Profile?.Background_image_url
                      : "/aboutUs.jpeg"
                  }
                  profileImageUrl={
                    Profile?.profile_image_url
                      ? Profile?.profile_image_url
                      : "/avatar.jpeg"
                  }
                />
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        {/* Popup Edit Modal */}
        {showEditModal && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <h2>Edit Profile</h2>
              <input
                type="text"
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter new name"
                className={styles.input}
              />
              <textarea
                onChange={(e) => setTempDescription(e.target.value)}
                placeholder="Enter new description"
                className={styles.textarea}
              />
              <div className={styles.modal_buttons}>
                <button
                  onClick={handleSaveChanges}
                  className={styles.save_button}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className={styles.close_button}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.descriptionAndCalendar}>
          <div>
            <div className={styles.description}>
              {/* <button > <p>Edit Profile</p></button>     */}
              <div className={styles.container}>
                <h3>Description</h3>
                <div>
                  {user?.role == "photographer" &&
                    user.portfolio.id == Profile?.id && (
                      <button
                        onClick={() => setShowEditModal(true)}
                        className={styles.edit_button}
                      >
                        <Edit2 size={20} color="black" />
                      </button>
                    )}
                </div>
              </div>

              <br />

              <p className={styles.iconContainer}>
                {updatedDescription?.trim()
                  ? updatedDescription
                  : "No description available"}
              </p>
            </div>

            <section>
              <SocialLinks />
            </section>

            <div>
              <GallerySection
                photographerId={
                  Profile?.photographer?.id ? Profile?.photographer?.id : ""
                }
              />
            </div>
          </div>

          <div className={styles.calendar}>
            {/* <Calendar
              currentMonth={currentMonth}
              currentYear={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            /> */}

            {Array.isArray(disabledDates) && disabledDates.length > 0 ? (
              <Calendar
                tileDisabled={({ date }) =>
                  disabledDates.some((dt) => {
                    const disabledDate = new Date(dt);
                    return (
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    );
                  })
                }
              />
            ) : (
              <Calendar />
            )}
            <Packages />
          </div>
        </div>

        <div>
          <CustomerReviews
            photographerId={
              Profile?.photographer?.id ? Profile?.photographer?.id : ""
            }
          />
        </div>
      </main>
    </>
  );
};

export default Portfolio;

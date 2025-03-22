"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getByIdportfolio,updateByIdportfolio} from "@/app/redux/features/portfolio";
import styles from './index.module.css'
import GallerySection from './GallerySection';
import CustomerReviews from "./CustomerReviews/index";
import Calendar from './Calendar/calendar';
import { useState,useEffect } from "react";
import ProfileHeader from './ProfileHeader';
import { Edit2} from "lucide-react";
import Packages from './Packages/packages';
import SocialLinks from './SocialLinks';
import { LoadingSpinner } from "./LoadingSpinner";

const Portfolio= () => {

  const [currentMonth, setCurrentMonth] = useState(0); 
  const [currentYear, setCurrentYear] = useState(2025);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };


  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // fetch by id portfolio
    dispatch(getByIdportfolio({ participantId: "" }));
  }, [dispatch]);

  const activePortfolio = useSelector((state: RootState) => state.portfolio.activePortfolio) || { results: [] };
  const activeReview = useSelector((state: RootState) => state.portfolio.activeReview) || { results: [] };

  console.log("active portfolio : ",activePortfolio)

  const Profile = activePortfolio?.data ;
  const Review = activeReview?.data;


  const [updatedName, setUpdatedName] = useState(Profile?.name || "");
  const [updatedDescription, setUpdatedDescription] = useState(Profile?.description || "");

  const [tempName, setTempName] = useState(updatedName);
  const [tempDescription, setTempDescription] = useState(updatedDescription);

  
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Update state when Profile data changes
    if (Profile) {
      setUpdatedName(Profile.name);
      setUpdatedDescription(Profile.description);
    }
  }, [Profile]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", tempName || updatedName);
      formData.append("description", tempDescription || updatedDescription);

      // Dispatch update action
      await dispatch(updateByIdportfolio({ formData })).unwrap();

      // Fetch updated portfolio data
      dispatch(getByIdportfolio({ participantId: "" }));

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


  return (
    <>
      <main className={styles.portfolio}>
        <div className= {styles.banner}>

          <div>
            {Profile ? (
              <div key={Profile.id}>
                <ProfileHeader 
                id={Profile.id} 
                name={updatedName}
                coverImageUrl={Profile.Background_image_url }
                profileImageUrl={Profile.profile_image_url }
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
                <button onClick={handleSaveChanges} className={styles.save_button}>Save</button>
                <button onClick={() => setShowEditModal(false)} className={styles.close_button}>Close</button>
              </div>
            </div>
          </div>
        )}

        
            

        <div className={styles.descriptionAndCalendar}>
          <div>
            <div className={styles.description}>

            {/* <button > <p>Edit Profile</p></button>     */}
            <div>
                <div className={styles.container}>
                  <h2>Description</h2>
                  <div>
                    <button onClick={() => setShowEditModal(true)} className={styles.edit_button}>
                      <Edit2 size={20} color="black" />
                    </button>
                  </div>
                </div>

                <br />

                <p className={styles.iconContainer}>
                  {updatedDescription?.trim() ? updatedDescription : "No description available"}
                </p>
              </div>               
            </div>
            
            <section>
              <SocialLinks/>
            </section>

            <div>
              < GallerySection/>
            </div>  
          </div>

                      
          <div className={styles.calendar}>
            <Calendar
              currentMonth={currentMonth}
              currentYear={currentYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <Packages/>
          </div>
        </div>

        <div>
          < CustomerReviews />
        </div>
        
      </main>
    </>
  )
}

export default Portfolio;
"use client";


import { FaFacebook, FaInstagram,   FaTwitter, FaLinkedin } from 'react-icons/fa';


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { /*getAllportfolio ,*/ getByIdportfolio,updateByIdportfolio, getByIdgallery, getByIdreview/*, updateByIdportfolio */} from "@/app/redux/features/portfolio";



//import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'

import GallerySection from './GallerySection';
import CustomerReviews from "./CustomerReviews/customerReviews";

import Calendar from './Calendar/calendar';
import { useState,useEffect } from "react";
import ProfileHeader from './ProfileHeader';
import { /*Heading, */ Pencil } from "lucide-react";

import Packages from './Packages/packages';

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
    
      /*useEffect(() => {
        // fetch all portfolio
        dispatch(getAllportfolio({ participantId: "" }));
      }, [dispatch]);
      */

      useEffect(() => {
        // fetch by id portfolio
        dispatch(getByIdportfolio({ participantId: "" }));
      }, [dispatch]);

      // useEffect(() => {
      //   // fetch by id portfolio
      //   dispatch(updateByIdportfolio({ participantId: "" }));
      // }, [dispatch]);


      useEffect(() => {
        // fetch by id gallery
        dispatch(getByIdgallery({ participantId: "" }));
      }, [dispatch]);

      useEffect(() => {
        //fetch by id review
        dispatch(getByIdreview({ participantId: ""}));
      }, [dispatch]);



    
      //const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio);
      //const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio) || { data: [] };
      
      //const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio) || { results: [] };
      const activePortfolio = useSelector((state: RootState) => state.portfolio.activePortfolio) || { results: [] };
      const activeGallery = useSelector((state: RootState) => state.portfolio.activeGallery) || { results: [] };
      const activeReview = useSelector((state: RootState) => state.portfolio.activeReview) || { results: [] };

      console.log("active portfolio : ",activePortfolio)


      //const Profile = allPortfolio?.data?.results?.find(profile => profile.id === "67acf4d1ce9e81d9345dc6ee");
      const Profile = activePortfolio?.data ;
      const Gallery = activeGallery?.data;
      const Review = activeReview?.data;


  const [updatedName, setUpdatedName] = useState(Profile?.name || "");
  const [updatedDescription, setUpdatedDescription] = useState(Profile?.description || "");

  const [tempName, setTempName] = useState(updatedName);
  const [tempDescription, setTempDescription] = useState(updatedDescription);

  
  const [showEditModal, setShowEditModal] = useState(false);

  /* Show edit modal with temporary values */
// const handleOpenEditModal = () => {
//   setTempName(updatedName);  // Initialize with the current values
//   setTempDescription(updatedDescription);
//   setShowEditModal(true);
// };

  useEffect(() => {
    // Fetch portfolio data on mount
    dispatch(getByIdportfolio({ participantId: "" }));
  }, [dispatch]);

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
      // formData.append("name", updatedName);
      formData.append("name", tempName);
      // formData.append("description", updatedDescription);
      formData.append("description", tempDescription);

      // Dispatch update action
      await dispatch(updateByIdportfolio({ formData })).unwrap();

      // Fetch updated portfolio data
      dispatch(getByIdportfolio({ participantId: "" }));

      // Update the main state after saving
      setUpdatedName(tempName);
      setUpdatedDescription(tempDescription);


      // Close modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update portfolio:", error);
      alert("An error occurred while updating.");
    }
  };


      //console.log("Redux State:", useSelector((state: RootState) => state.portfolio));
      


      //console.log("allPortfolio:", allPortfolio);
      //console.log("allPortfolio.data:", allPortfolio?.data);
      
      //console.log("allPortfolio.data.results:", allPortfolio?.data?.results);
      //console.log("allPortfolio.data:", allPortfolio?.data);
      //console.log("allPortfolio.data.results:", activePortfolio?.data?.results);
      //////////////////////////////console.log("allPortfolio.data:",activePortfolio?.data);
      //console.log("allPortfolio.data.portfolio:",activePortfolio?.data);
      //////////////////////////////////console.log("allPortfolio.data.gallery", activeGallery?.data);
      ///////////////////////////////////console.log("activeGallery object:", activeGallery);

      //console.log("id :",activePortfolio?.data);
      //console.log('name', Profile.portfolio?.name );
      
      ///////////////////////////////////console.log("portfolio.data.review", activeReview.data);
      console.log("updatedDescription", updatedDescription);  
      console.log("updatedName", updatedName);


  return (
    <>
    
    <main className={styles.portfolio}>
      <div className= {styles.banner}>
        



      <div>
        {Profile ? (
          <div key={Profile.id}>
            <ProfileHeader 
            id={Profile.id} 
            //name={Profile.name } 
            name={updatedName}
            coverImageUrl={Profile.Background_image_url }

            profileImageUrl={Profile.profile_image_url }
            
          />
          {/* Photographer Info with Edit Button */}
     


       
      </div>
    ) : (
      <p>Loading...</p>
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
                // value={editedName}
                // value={updatedName}
                // value={tempName}
                // onChange={(e) => setEditedName(e.target.value)}
                // onChange={(e) => setUpdatedName(e.target.value)}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter new name"
                className={styles.input}
              />
              <textarea
                // value={editedDescription}
                // value={updatedDescription}
                // onChange={(e) => setEditedDescription(e.target.value)}
                // onChange={(e) => setUpdatedDescription(e.target.value)}
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
                    {/* {Profile ? ( */}
                      
                      {/* <div key={Profile.id}> */}
                        <div className={styles.container}>
                            <h2>Description</h2>
                            <div>
                              {/* <button onClick={() => setShowEditModal(true)} className={styles.edit_button}> */}
                              {/* <button onClick={() => setShowEditModal(true)} className={styles.edit_button}>
                                <Pencil size={20} color="black" />
                              </button> */}
                              <button onClick={() => setShowEditModal(true)} className={styles.edit_button}>
                                <Pencil size={20} color="black" />
                              </button>
                            </div>
                          </div>
                        
                        
                        
                        <br></br>
                        <p>
                           {/* {Profile.description} */}
                           {updatedDescription}
                                 
                        </p>
                      
                      </div>
                    {/* ) : (
                      <p>Loading...</p>
                    )}
                  </div> */}




                
              </div>
              <section className={styles.connect}>
                <h2>Connect with me</h2>
        
                <div className={styles.social_icon}>
                  
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </Link>

                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </Link>

                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </Link>

                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </Link>

                  </div>
              </section>


              <div>
                {Gallery ? (
                  //<div key={Gallery.id}>
                    < GallerySection
                      Gallery = {Gallery.Gallery}
                    />
                  //</div>
                    ) : (
                      <p>Loading...</p>
                    )}
               </div>




              {/* <div>
                {Gallery ? (
                  <div key={Gallery.id}>
                    < GallerySection
                      photo_collection = {Gallery.photo_collection}
                    />
                  </div>
                    ) : (
                      <p>Loading...</p>
                    )}
              </div> */}
              
              {/*<div className={styles.tags}>
                <span>Wedding Photography</span>
                <span>Portrait Photography</span>
                <span>Corporate Photography</span>
              </div>
              */}
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
          {Review ? (
            <div key={Review.id}>
              <CustomerReviews 

              reviews = {Review.reviews}
              />
            </div>  
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
    </main>

    </>
   
  )
}

export default Portfolio;
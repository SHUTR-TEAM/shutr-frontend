"use client";

//import {useDispatch, useSelector} from "react-redux";
//import { fetchData } from "../redux/dataSlice";
//import { getAllportfolio } from "../../redux/features/portfolio";
//import { RootState } from "../redux/store";
//import { RootState } from "../../redux/store";


import { FaFacebook, FaInstagram,   FaTwitter, FaLinkedin } from 'react-icons/fa';


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getAllportfolio , getByIdportfolio, getByIdgallery, getByIdreview } from "@/app/redux/features/portfolio";



import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'

import GallerySection from './GallerySection';
import CustomerReviews from "./CustomerReviews/customerReviews";

import Calendar from './Calendar/calendar';
import { useState,useEffect } from "react";
import ProfileHeader from './ProfileHeader';
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
      


      //const Profile = allPortfolio?.data?.results?.find(profile => profile.id === "67acf4d1ce9e81d9345dc6ee");
      const Profile = activePortfolio?.data ;
      const Gallery = activeGallery?.data;
      const Review = activeReview?.data;




      //console.log("Redux State:", useSelector((state: RootState) => state.portfolio));
      


      //console.log("allPortfolio:", allPortfolio);
      //console.log("allPortfolio.data:", allPortfolio?.data);
      
      //console.log("allPortfolio.data.results:", allPortfolio?.data?.results);
      //console.log("allPortfolio.data:", allPortfolio?.data);
      //console.log("allPortfolio.data.results:", activePortfolio?.data?.results);
      console.log("allPortfolio.data:",activePortfolio?.data);
      //console.log("allPortfolio.data.portfolio:",activePortfolio?.data);
      console.log("allPortfolio.data.gallery", activeGallery.data);
      //console.log("id :",activePortfolio?.data);
      //console.log('name', Profile.portfolio?.name );
      
      console.log("portfolio.data.review", activeReview.data);



  return (
    <>
    
    <main className={styles.portfolio}>
      <div className= {styles.banner}>



      <div>
        {Profile ? (
          <div key={Profile.id}>
            <ProfileHeader 
            id={Profile.id} 
            name={Profile.name } 
            coverImageUrl={Profile.Background_image_url }

            profileImageUrl={Profile.profile_image_url }
            
          />


       
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
      
      
       
        
      </div>
      
          

          <div className={styles.descriptionAndCalendar}>
            <div>

            
              <div className={styles.description}>
                
                

                  <div>
                    {Profile ? (
                      
                      <div key={Profile.id}>
                        <h2>Description</h2>
                        <br></br>
                        <p>
                           {Profile.description}
        
                        </p>
                      
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>




                
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
                  <div key={Gallery.id}>
                    < GallerySection
                      photo_collection = {Gallery.photo_collection}
                    />
                  </div>
                    ) : (
                      <p>Loading...</p>
                    )}
              </div>
              
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


              // name = {Review.name}
              // rating = {Review.rating}
              // reviewText = {Review.reviewtext}
              // profile_image_url = {Review.profile_image_url}

              />
            </div>  
          ) : (
            <p>Loading...</p>
          )}
        </div>


        {/* <div><CustomerReviews /></div> */}
      

     
    </main>
    
    </>

   
  )
}

export default Portfolio;
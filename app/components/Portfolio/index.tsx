"use client";

//import {useDispatch, useSelector} from "react-redux";
//import { fetchData } from "../redux/dataSlice";
//import { getAllportfolio } from "../../redux/features/portfolio";
//import { RootState } from "../redux/store";
//import { RootState } from "../../redux/store";


import { FaFacebook, FaInstagram,   FaTwitter, FaLinkedin } from 'react-icons/fa';


import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { getAllportfolio } from "@/app/redux/features/portfolio";



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
    
      useEffect(() => {
        // fetch all portfolio
        dispatch(getAllportfolio({ participantId: "" }));
      }, [dispatch]);
    
      //const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio);
      //const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio) || { data: [] };
      const allPortfolio = useSelector((state: RootState) => state.portfolio.allPortfolio) || { results: [] };
      const Profile = allPortfolio?.data?.results?.find(profile => profile.id === "67acf4d1ce9e81d9345dc6ee");




      //console.log("Redux State:", useSelector((state: RootState) => state.portfolio));
      


      //console.log("allPortfolio:", allPortfolio);
      //console.log("allPortfolio.data:", allPortfolio?.data);
      
      console.log("allPortfolio.data.results:", allPortfolio?.data?.results);




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
        coverImageUrl={Profile.Background_image_url}
        profileImageUrl={Profile.profile_image_url}
        
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
                <h2>Description</h2>
                <br></br>
                

                  <div>
                    {Profile ? (
                      <div key={Profile.id}>
                        <p>
                           {Profile.description}
                        </p>
                      
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>




                
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
        
        
           
        < GallerySection/>

        
        <div>
          <CustomerReviews />

        </div>
      

     
    </main>
    
    </>

   
  )
}

export default Portfolio;
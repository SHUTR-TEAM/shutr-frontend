"use client";

import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'

import GallerySection from './GallerySection';
import CustomerReviews from "./CustomerReviews/customerReviews";

import Calendar from './Calendar/calendar';
import { useState } from "react";
import ProfileHeader from './ProfileHeader';


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

  return (
    <>
    
    <main className={styles.portfolio}>


      <div className= {styles.banner}>

        <ProfileHeader/>
       
        
        
      </div>
      
          

          <div className={styles.descriptionAndCalendar}>
            <div>

            
              <div className={styles.description}>
              <h2>Description</h2>
              <br></br>
                
                <p>
                  Find professional photographers for every occasion—from weddings to
                  corporate events, all in one place. Find professional photographers for
                  every occasion—from weddings to corporate events, all in one place.
                  Find professional photographers for every occasion—from weddings to
                  corporate events, all in one place. Find professional photographers for
                  every occasion—from weddings to corporate events, all in one place.
                </p>
              </div>
              
              <div className={styles.tags}>
                <span>Wedding Photography</span>
                <span>Portrait Photography</span>
                <span>Corporate Photography</span>
              </div>
            </div>
            <div className={styles.calendar}>
              <Calendar
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
            </div>
          </div>




        <section className={styles.connect}>
          <h2>Connect with me</h2>
  
          <div className={styles.social_icon}>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
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
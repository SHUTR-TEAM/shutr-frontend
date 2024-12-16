import React from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
//import '@fontawesome/fontawesome-free/css/all.min.css';
import GallerySection from './GallerySection';



function Portfolio() {
  return (
    <>
    
    <main className={styles.portfolio}>
        
        <div className= {styles.banner}>
        <Image 
                src="/pbg.png" 
                alt="Banner" 
                height={350}
                width={1540} 
               
       />  

      <div className= {styles.profilePic}>
        <Image
                src="/photographer.png"
                alt="Pabodha M. Pathirana"
                layout="intrinsic" 
                height={250}
                width={240} 
                 
        />
      </div>
       
        <div className= {styles.photographer_info} >
            <h1>Pabodha M. Pathirana</h1>
            <p>⭐⭐⭐⭐⭐ (234)</p>   
        </div>
        
        </div>
      

        
      
      
          <div className= {styles.profileDetails}>
            <h2>Description</h2>
            <p className= {styles.description}>
            Find professional photographers for every occasion—from weddings to corporate events, all in one place.
            Find professional photographers for every occasion—from weddings to corporate events, all in one place. 
            Find professional photographers for every occasion—from weddings to corporate events, all in one place.
            Find professional photographers for every occasion—from weddings to corporate events, all in one place.
            </p>
          </div>

          
          <div className= {styles.tags}>
            <span>Wedding Photography</span>
            <span>Portrait Photography</span>
            <span>Corporate Photography</span>
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

        
         


     
    </main>
    
    </>

   
  )
}

export default Portfolio
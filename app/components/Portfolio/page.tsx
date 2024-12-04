import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'








function page() {
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
          
        </section>

     
    </main>
    </>
  )
}

export default page
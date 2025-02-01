import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

const GallerySection = () => {
    return (
        <section className={styles.gallery}>
        <h2>Gallery</h2>

        <div className= {styles.button_container}>
          <button className= {styles.button} >Wedding Photography</button>
          <button className= {styles.button}>Portrait Photography</button>
          <button className= {styles.button}>Corporate Photography</button>
        </div>


        <div className= {styles.gallery_grid}>
          {[...Array(6)].map((_, index) => (
            <div key={index} >
              <Image
                src="/gi.png"
                alt={`Gallery item ${index + 1}`}
                width={460}
                height={300}
                className={styles.image}
              />
            </div>
            
          ))}
        </div>
      </section>
    );
  };
  
  export default GallerySection;
  
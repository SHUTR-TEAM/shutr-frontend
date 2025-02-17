import Image from "next/image";
import React from "react";
import styles from "./index.module.css";


interface ProfilegalleryProps {
  photo_collection : string[];
}


//const GallerySection = ({
export default function GallerySection ({
  photo_collection ,
}: ProfilegalleryProps)  {

    return (
        <section className={styles.gallery}>
        <h2>Gallery</h2>

        <div className= {styles.button_container}>
          <button className= {styles.button} >Wedding Photography</button>
          <button className= {styles.button}>Portrait Photography</button>
          <button className= {styles.button}>Corporate Photography</button>
        </div>


        {/*<div className= {styles.gallery_grid}>
          {[...Array(6)].map((_, index) => (
            <div key={index} >
              <Image
                //src="/gi.png"
                src="https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={`Gallery item ${index + 1}`}
                width={390}
                height={300}
                className={styles.image}
              />
            </div>
            
          ))}
        </div> */}

        <div className={styles.gallery_grid}>
  {photo_collection.map((photoUrl, index) => (
    <div key={index}>
      <Image
        src={photoUrl}
        alt={`Gallery item ${index + 1}`}
        width={390}
        height={300}
        className={styles.image}
      />
    </div>
  ))}
</div>
      </section>
    );
  }
  
  
  
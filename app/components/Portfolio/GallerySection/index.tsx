

import Image from "next/image";
import React, { useState } from "react";
import styles from "./index.module.css";

interface Photo {
  url: string;
  catagory: string;
}

interface GallerySectionProps {
  Gallery: Photo[];
}

export default function GallerySection({ Gallery = [] }: GallerySectionProps) {


  console.log("show Gallery : " , Gallery);



  const imagesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPhotos = selectedCategory === "All"
    ? Gallery
    : Gallery.filter(photo => photo.catagory.toLowerCase() === selectedCategory.toLowerCase());

  const totalPages = Math.ceil(filteredPhotos.length / imagesPerPage);

  const currentImages = filteredPhotos.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const uniqueCategories = ["All", ...Array.from(new Set(Gallery.map(photo => photo.catagory)))];

  return (
    <section className={styles.gallery}>
      <h2>Gallery</h2>

      <div className={styles.button_container}>
        {uniqueCategories.map(category => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? `${styles.button} ${styles.activeButton}`
                : styles.button
            }
            onClick={() => handleCategoryChange(category)}
          >
            {/* {category} Photography */}
            {category}
          </button>
        ))}
      </div>

      <div className={styles.gallery_grid}>
        {currentImages.map((photo, index) => (
          <div key={index}>
            <Image
              src={photo.url}
              alt={`Gallery item ${index + 1}`}
              width={390}
              height={300}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationDots}>
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={
                index === currentPage ? styles.activeDot : styles.dot
              }
              onClick={() => handlePageChange(index)}
            ></span>
          ))}
        </div>
      )}
    </section>
  );
}


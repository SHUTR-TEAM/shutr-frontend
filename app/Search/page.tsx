import React from 'react';
import CategorySection from "../components/Search/CategorySection";
import SearchBox from "../components/Search/SeacrhBox";
import styles from "./page.module.css";

export default function Search() {
  return(
    <div>
      <div className={styles.mainContainer}>      
        <div className={styles.categorySection}>
          <CategorySection />
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBox />
        </div>
      </div>
    </div>     
  ) 
}
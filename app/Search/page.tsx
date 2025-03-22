'use client';
import { useState } from 'react';
import CategorySection from "../components/Search/CategorySection";
import SearchBox from "../components/Search/SeacrhBox";
import styles from "./page.module.css";
import StoreProvider from "@/app/redux/storeProvider";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Pagination from '../components/Search/Pagination/Pagination';

export default function Search() {
  const [showFilters, setShowFilters] = useState(false);

  // Close the overlay and hide filters
  const handleCloseOverlay = () => {
    setShowFilters(false);
  };

  return (
    <div>
      <StoreProvider>

        <div className={styles.mobileToggleContainer}>
          <div
            className={styles.filterToggleBtn}
            onClick={() => setShowFilters(true)}
          ><div className={styles.btnBox}>
            <IoFilter className={styles.btnFilter}/>
            <div>Show Filters</div> 
           </div>            
          </div>
        </div>

        {/* Conditionally rendered overlay and mobile sidebar when filters are shown */}
        {showFilters && (
          <>
            <div className={styles.overlay} onClick={handleCloseOverlay}></div>
            <div className={styles.mobileSidebar}>
              <button
                className={styles.closeBtn}
                onClick={handleCloseOverlay}
              >
                <IoMdClose />
              </button>
              <CategorySection />
            </div>
          </>
        )}

        <div className={styles.mainContainer}>
          <div className={styles.categorySection}>
            <CategorySection />
          </div>
          <div className={styles.searchBarContainer}>
            <SearchBox />
            <Pagination/>
          </div>
        </div>
      </StoreProvider>
    </div>
  );
}

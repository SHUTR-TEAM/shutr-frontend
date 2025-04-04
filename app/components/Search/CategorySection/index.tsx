'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import { AppDispatch } from "@/app/redux/store";
import { setFilters,clearFilters, fetchFilteredResults } from "@/app/redux/features/searchSlice";

export default function CategorySection() {

  const dispatch = useDispatch<AppDispatch>();

  // Local state to temporarily hold selected filter values before applying
  const [filters, setLocalFilters] = useState({
    style: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    experienceLevel: "",
  });

  // Generic handler to toggle or set filter values based on button/input
  const handleButtonClick = (name: keyof typeof filters, value: string) => {
    setLocalFilters((preFilters) => ({
      ...preFilters,   // Keep existing filter values
      [name]: preFilters[name] === value ? "" : value,  
    }));
  };

  const applyFilters = () => {
    dispatch(setFilters(filters)); // Save filters to Redux
    dispatch(fetchFilteredResults()); // Fetch results based on applied filters
  };

  //clear filters
  const handleClearFilters = () => {
    setLocalFilters({
      style: "",
      minPrice: "",
      maxPrice: "",
      availability: "",
      experienceLevel: "",
    });

    dispatch(clearFilters()); 
    dispatch(fetchFilteredResults()); 
  };

  return (
    <div className={styles.container}>

      <aside className={styles.filters}>
        <h3>Filters</h3>

        {/* Style */}
        <div className={styles.filterGroup}>
          <h4>Style</h4>

          <div className={styles.filterButtons}>
            {["Wedding", "Portrait", "Wildlife", "Videography"].map((element) => (
              <button
                key={element}
                onClick={() => handleButtonClick("style", element)}
                className={filters.style === element ? styles.activeButton : ""}
              >
                {element}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className={styles.filterGroup}>
          <h4>Price Range</h4>
          <div className={styles.priceRange}>
            <input type="number"
                   placeholder="Min"
                   step="1000"
                   value={filters.minPrice}
                   onChange={(e)=> handleButtonClick("minPrice",e.target.value)}
            />
            <span className={styles.rangeSeparator}>-</span>
            <input type="number"
                  placeholder="Max"
                  step="1000"
                  value={filters.maxPrice}
                  onChange={(e)=> handleButtonClick("maxPrice",e.target.value)}
            />
          </div>
        </div>

        {/* Availability */}    
        <div className={styles.filterGroup}>
          <h4>Availability</h4>
          <input type="date"
           value={filters.availability}
           onChange={(e) => handleButtonClick("availability", e.target.value)} 
          />
        </div>

        {/* Experience Level */}    
        <div className={styles.filterGroup}>
          <h4>Experience Level</h4>
          <div className={styles.filterButtonsLong}>
            {["Beginner", "Intermediate", "Expert"].map((level) => (
              <button
                key={level}
                onClick={() => handleButtonClick("experienceLevel", level)}
                className={filters.experienceLevel === level ? styles.activeButton : ""}
              >
                {level} ({level === "Beginner" ? "<1 year" : level === "Intermediate" ? "1-3 years" : "3+ years"})
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={applyFilters} className={styles.applyBtn}>
            Apply Filters
          </button>
          <button onClick={handleClearFilters} className={styles.clearBtn}>
            Clear Filters
          </button>
        </div>
        
      </aside>
    </div>
  );    
}
  
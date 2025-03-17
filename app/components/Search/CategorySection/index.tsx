'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./index.module.css";
import { AppDispatch } from "@/app/redux/store";
import { setFilters,clearFilters, fetchFilteredResults } from "@/app/redux/features/searchSlice";

export default function CategorySection() {

  //to get the user input (filter)
  //key-value pair structure used to store related data.
  // const [filters,setFilters] = useState({
  //   style:"",
  //   minPrice:"",
  //   maxPrice:"",
  //   availability:"",
  //   experienceLevel:"",
  // });

  const dispatch = useDispatch<AppDispatch>();

  // Local filter state before applying
  const [filters, setLocalFilters] = useState({
    style: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    experienceLevel: "",
  });

  const handleButtonClick = (name: keyof typeof filters, value: string) => {
    setLocalFilters((preFilters) => ({
      ...preFilters,   // Keep existing filter values
      //If the current filter value (prevFilters[name]) is already equal to the value, it sets it to "" (empty string), meaning the filter value removed.
      //Otherwise, it updates the filter with the value.
      [name]: preFilters[name] === value ? "" : value,  
    }));
  };

  const applyFilters = () => {
    dispatch(setFilters(filters)); // Save filters to Redux
    dispatch(fetchFilteredResults()); // Fetch results based on applied filters
  };

  // **CLEAR FILTERS**: Reset local state and Redux state
  const handleClearFilters = () => {
    setLocalFilters({
      style: "",
      minPrice: "",
      maxPrice: "",
      availability: "",
      experienceLevel: "",
    });

    dispatch(clearFilters()); // Reset Redux filters
    dispatch(fetchFilteredResults()); // Fetch default results
  };


  /*
  const handleButtonClick = (name,value) =>{
    // Update the filters state while preserving existing values
    // 1. 'prevFilters' holds the current state before the update.
    // 2. '...prevFilters' ensures all previous filter values remain unchanged.
    // 3. '[name]: value' dynamically updates only the specified filter.
    // This prevents overwriting the entire state and ensures only the intended property is modified.
    setFilters((preFilters)=>({
      ...preFilters,   // Keep existing filter values
      //If the current filter value (prevFilters[name]) is already equal to the value, it sets it to "" (empty string), meaning the filter value removed.
      //Otherwise, it updates the filter with the value.
      [name]: preFilters[name] === value ? "" : value,   
    }));

  };*/

 

  return (
    <div className={styles.container}>

      <aside className={styles.filters}>
        <h3>Filters</h3>
        <div className={styles.filterGroup}>
          <h4>Style</h4>

          <div className={styles.filterButtons}>
            {["Wedding", "Portrait", "Wildlife", "Videography"].map((element) => (
              <button
                key={element}
                onClick={() => handleButtonClick("style", element)}
                // If the current filter value for 'style' matches the button's element, apply the 'activeButton' class; otherwise, apply no additional class
                className={filters.style === element ? styles.activeButton : ""}
              >
                {element}
              </button>
            ))}
          </div>
        </div>

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

        <div className={styles.filterGroup}>
          <h4>Availability</h4>
          <input type="date"
           value={filters.availability}
           onChange={(e) => handleButtonClick("availability", e.target.value)} 
          />
        </div>

        {/* Experience Level Filter */}
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
  
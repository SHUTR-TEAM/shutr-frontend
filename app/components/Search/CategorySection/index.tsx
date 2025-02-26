'use client'
import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import Card from "../Card";

export default function CategorySection() {

  //to get the user input (filter)
  //key-value pair structure used to store related data.
  const [filters,setFilters] = useState({
    style:"",
    minPrice:"",
    maxPrice:"",
    availability:"",
    experienceLevel:"",
  });

  const [results,setResults] = useState("");

  const handleButtonClick = (name,value) =>{
    // Update the filters state while preserving existing values
    // 1. 'prevFilters' holds the current state before the update.
    // 2. '...prevFilters' ensures all previous filter values remain unchanged.
    // 3. '[name]: value' dynamically updates only the specified filter.
    // This prevents overwriting the entire state and ensures only the intended property is modified.
    setFilters((preFilters)=>({
      ...preFilters,   // Keep existing filter values
      [name]:value    // Update only the specified filter dynamically
    }));
  };

  const applyFilters = async () => {
    
  };  

  console.log(filters.style)

  return (
    <div className={styles.container}>

      <aside className={styles.filters}>
        <h3>Filters</h3>
        <div className={styles.filterGroup}>
          <h4>Style</h4>
          <div className={styles.filterButtons}>
            {/*immediately calls the handleButtonClick function as soon as the component renders, instead of waiting for the button click.so use ARROW Function*/}
            <button onClick={()=>handleButtonClick("style", "Wedding")} className="style">Wedding</button>
            <button onClick={() => handleButtonClick("style", "Portrait")} className="style">Portrait</button>
            <button onClick={() => handleButtonClick("style", "Wildlife")} className="style">Wildlife</button>
            <button onClick={() => handleButtonClick("style", "Videography")} className="style">Videography</button>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4>Price Range</h4>
          <div className={styles.priceRange}>
            <input type="number" placeholder="Min" />
            <span className={styles.rangeSeparator}>-</span>
            <input type="number" placeholder="Max" />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4>Availability</h4>
          <input type="date" />
        </div>

        {/* Experience Level Filter */}
        <div className={styles.filterGroup}>
          <h4>Experience Level</h4>
          <div className={styles.filterButtonsLong}>
            <button>Beginner (&lt;1 year experience)</button>
            <button>Intermediate ( 1-3 year experience )</button>
            <button>Expert ( 3+ year experience )</button>
          </div>
        </div>

        <button onClick={applyFilters} className={styles.applyBtn} >Apply Filters</button>
      </aside>
    </div>
  );    
}
  
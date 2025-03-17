"use client";
import { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { IoSearch } from "react-icons/io5";
import Card from "../Card";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  fetchDefaultResults,
  fetchSearchResults,
  setSearchTerm,
  clearSearchResults,
  setSortBy,
  fetchFilteredResults,
} from "@/app/redux/features/searchSlice";
import ErrorSection from "../ErrorSection";

export default function SearchBox() {

  //Setting Up Redux Dispatch and State
  //Allows us to send actions to Redux.
  const dispatch = useDispatch<AppDispatch>(); 

  const { searchTerm, results, defaultResults, loading, error ,sortBy,filters} = useSelector(
    (state: RootState) => state.search //get the search state from the redux 
  );

  const [selectedSort, setSelectedSort] = useState("relevant"); // Default sorting

  // Handle input changes and dispatch search term
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchTerm(value));

    //user enter a search term
    if (value.trim() !== "") {
      dispatch(fetchFilteredResults());
    } else {
      dispatch(clearSearchResults());
      dispatch(fetchDefaultResults(selectedSort));
    }
  };

  //if user click the button
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(setSearchTerm(searchTerm));
      dispatch(fetchFilteredResults());
    } else {
      dispatch(clearSearchResults());
      dispatch(fetchDefaultResults(selectedSort));
    }
  };

  //user press the Enter Key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Handle sorting selection
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setSelectedSort(sortValue);
    dispatch(setSortBy(sortValue));
  
    dispatch(fetchFilteredResults()); // Fetch sorted results with the search term
  };
  
  

  // Fetch default results on first load
  useEffect(() => {
    dispatch(fetchFilteredResults());
  }, [dispatch, selectedSort, filters, searchTerm]); // Now updates with search term
  
  

  return (
    <div>
      <div className={styles["search-bar-container"]}>
        <div className={styles["search-box"]}>
          <IoSearch className={styles["search-icon"]} />
          <input
            type="text"
            className={styles["search-input"]}
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange} 
            onKeyDown={handleKeyDown} 
          />
        </div>
        <div>
          <button className={styles["search-btn"]} onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className={styles["sort-by-container"]}>
          <label htmlFor="sort-by" className={styles["sort-by-label"]}>
            Sort By:
          </label>
          <select
            id="sort-by"
            className={styles["search-dropdown"]}
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option value="relevant">Most relevant</option>
            <option value="recent">Most recent</option>
            <option value="popular">Top rated</option>
          </select>
        </div>
      </div>
      <div className={styles.cardSection}>
         {/* Show ErrorSection if no results are found and search term or filters are applied */}
         {!loading && !error && results.length === 0 && (searchTerm.trim() !== "" || Object.values(filters).some((value) => value !== "")) && (
           <ErrorSection />
         )}

        {/* Show search results if available */}
        {!loading && !error && results.length > 0 && <Card data={results} />}

        {/* Show default results*/}
        {!loading && !error && results.length === 0 && searchTerm.trim() === "" && (
          <Card data={defaultResults} />
        )}
      </div>
    </div>
  );
}

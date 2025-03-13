"use client";
import { useEffect } from "react";
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
} from "@/app/redux/features/searchSlice";
import ErrorSection from "../ErrorSection";

export default function SearchBox() {

  //Setting Up Redux Dispatch and State
  //Allows us to send actions to Redux.
  const dispatch = useDispatch<AppDispatch>(); 

  const { searchTerm, results, defaultResults, loading, error } = useSelector(
    (state: RootState) => state.search //get the search state from the redux 
  );

  // Handle input changes and dispatch search term
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchTerm(value));

    //user enter a search term
    if (value.trim() !== "") {
      dispatch(fetchSearchResults(value));
    } else {
      dispatch(clearSearchResults());
      dispatch(fetchDefaultResults()); 
    }
  };

  //if user click the button
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(fetchSearchResults(searchTerm));
    } else {
      dispatch(clearSearchResults());
      dispatch(fetchDefaultResults());
    }
  };

  //user press the Enter Key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Fetch default results on first load
  useEffect(() => {
    dispatch(fetchDefaultResults());
  }, [dispatch]);

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
            Sort By :
          </label>
          <select id="sort-by" className={styles["search-dropdown"]}>
            <option value="relevant">Most relevant</option>
            <option value="recent">Most recent</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
      </div>

      <div className={styles.cardSection}>
        {/* Show ErrorSection if no results are found */}
        {!loading && !error && searchTerm.trim() !== "" && results.length === 0 && (
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

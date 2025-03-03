"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { IoSearch } from "react-icons/io5";
import Card from "../Card";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchDefaultResults, fetchSearchResults,setSearchTerm ,clearSearchResults} from "@/app/redux/features/searchSlice";

export default function SearchBox() {
    //Setting Up Redux Dispatch and State
    const dispatch = useDispatch<AppDispatch>();  //Allows us to send actions to Redux.
    /*  useSelector(state => state.search) → Gets the search state from Redux.
        searchTerm → The text typed by the user.
        results → The search results from the API.
        defaultResults → Results when no search is made.
        loading → Shows if an API request is in progress.
        error → Stores any error messages.*/
    const { searchTerm, results, defaultResults, loading, error } = useSelector((state: RootState) => state.search);

    //const [sortBy, setSortBy] = useState("relevant");

    // Function to handle input changes (on typing)
    //Dispatches an action (setSearchTerm) to the Redux store instead of updating a local state.
    //Updates searchTerm in Redux whenever the user types in the search box
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    };

    // Function to handle search action (Enter key or button click)
    //pass the serach term to the serachSlice(action)'s function called fetchSearchResults
    const handleSearch =() => {
        if (searchTerm.trim()!==""){
            dispatch(fetchSearchResults(searchTerm));
        }else {
            dispatch(clearSearchResults());
            dispatch(fetchDefaultResults())
        }      

    };

  // Function to detect Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

    useEffect(() => {
       dispatch(fetchDefaultResults());
     }, [dispatch]);

    return (
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
            <div>
                {/*if loading true display loading, if error true display the error */}
                {loading && <p>Loading...</p>}
                {error && <p>Error : {error}</p>}
                <Card data={searchResults} />
            </div>
        </div>
      </div>
      <div>
        <Card data={searchResults} />
      </div>
    </div>
  );
}

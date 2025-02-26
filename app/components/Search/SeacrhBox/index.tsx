"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Card from "../Card";

export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]); // Store search results 
    const [results, setResults] = useState<any[]>([]); // Store search results 

    // Function to handle input changes (on typing)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle search action (Enter key or button click)
    const handleSearch = async() => {
        // Perform search logic here (e.g., API call)
        //send the data to the api endpoint
        try{
            const response = await axios.get(`http://127.0.0.1:8000/search/users/`, {
                params: { q: searchTerm }  //Correct way to pass query params
            });
            setSearchResults(response.data);
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }         
    };

    // Function to detect Enter key press
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
         try {
             const response = await axios.post('http://127.0.0.1:8000/search/usersDefault/');
             setResults(response.data);
         } catch (error) {
             console.error("Error Searching", error);
         }
      };
 
      fetchData();
     }, []);

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
                        onChange={handleInputChange} // Update state on typing
                        onKeyDown={handleKeyDown} // Listen for Enter key
                    />
                </div>
                <div>
                    <button className={styles["search-btn"]} onClick={handleSearch}>Search</button>
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
                {searchResults.length === 0 ? (
                    <Card data={results} />
                    
                ) : (
                    <Card data={searchResults} />
                )}
            </div>
        </div>
         
    );
}

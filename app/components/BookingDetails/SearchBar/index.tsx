"use client";
import styles from "./index.module.css";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('latest'); // Default filter option

    // Function to update search term
    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to update filter value
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    // Function to send search query and filter to Django backend
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (searchTerm.trim() === '') return; // Prevent empty search
            
            try {
                const response = await fetch(
                    `http://localhost:8000/api/search-bookings/?query=${searchTerm}&filter=${filter}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch search results");
                }

                const data = await response.json();
                console.log("Search Results:", data); // Log response (You can update UI to show results)
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
    };

    return (
        <div>
            <div className={styles.space}>
                <div className={styles.searchBarContainer}>
                    {/* Search box */}
                    <div className={styles.searchBar}>
                        <IoIosSearch />
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={handleInputSearch}
                            onKeyDown={handleKeyDown} // Listen for Enter key
                        />
                    </div>

                    {/* Drop-down for Filters */}
                    <div className={styles.searchBarDropdown}>
                        <IoFilterOutline />
                        <label className={styles.labelName}>Filter:</label>
                        <select id="dropdown" value={filter} onChange={handleFilterChange}>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Booking Button */}
                    <div className={styles.btnContainer}>
                        <button className={styles.btn}>New Booking</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

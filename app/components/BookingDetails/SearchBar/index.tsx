'use client';
import styles from "./index.module.css";
//import react icons
import { IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";


const SearchBar = () => {

    const [searchTerm,setSearchTerm] = useState('');

    //funtion to get the user input value and set the searchTerm value to setSearchTerm function
    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(event.target.value);            
    }

    // Function to detect Enter key press
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log(searchTerm);
        }
    };     

    return(
        <div>
            <div className={styles.space}>
                <div className={styles.searchBarContainer}>

                    {/*searchbox*/}
                    <div className={styles.searchBar}>
                        <IoIosSearch/>
                        <input type="text"
                               placeholder="Search bookings..."
                               //call the handleInputSearch function (the function is trigger when user enetr values..)
                               onChange={handleInputSearch}
                               onKeyDown={handleKeyDown} // Listen for Enter key
                        />
                    </div>    

                    {/*drop down for Filters*/}
                    <div  className={styles.searchBarDropdown}>
                        <IoFilterOutline/>
                        <label className={styles.labelName} >Filter:</label>
                        <select id="dropdown">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>                     
                    </div>            

                    {/*Booking Button*/}
                    <div className={styles.btnContainer}>
                        <button className={styles.btn}>New Booking</button>
                    </div>

                </div>
            </div>            
        </div>
    )
}

export default SearchBar;
import React from "react";
import styles from "./page.module.css"
import SearchBar from "../components/BookingDetails/SearchBar";
import CartSection from "../components/BookingDetails/CartSection";

const BookingDetails = () => {

    const eventData = [
        {
            picture: "/wedding.jpg",
            name: "Sarah Johans",
            status: "Upcoming",
            time: "7:00 PM",
            event: "Wedding",
            location: "Grand Theater"
        },
        {
            picture: "/sports.jpg",
            name: "Mahinda",
            status: "Live",
            time: "6:30 PM",
            event: "Sports",
            location: "City Stadium"
        },
        {
            picture: "/festival.jpg",
            name: "Spandana",
            status: "Live",
            time: "8:00 PM",
            event: "Music",
            location: "Central Park"
        },
        {
            picture: "/event.jpg",
            name: "Ramuwa",
            status: "Upcoming",
            time: "2:00 PM",
            event: "Technology",
            location: "Convention Center"
        },
        {
            picture: "/birthday.jpg",
            name: "John Doe",
            status: "Ongoing",
            time: "12:00 PM",
            event: "Food",
            location: "Town Square"
        },
        {
            picture: "/art.jpg",
            name: "Japura",
            status: "Upcoming",
            time: "5:00 PM",
            event: "Art",
            location: "Modern Art Museum"
        },
        {
            picture: "/movie.jpg",
            name: "Movie Premiere",
            status: "Upcoming",
            time: "9:00 PM",
            event: "Film",
            location: "Downtown Cinema"
        },
        {
            picture: "/portrait.jpg",
            name: "Sunny",
            status: "Upcoming",
            time: "3:00 PM",
            event: "Portrait",
            location: "Corporate Hub"
        }
    ];    

    return(
        <div>
            <SearchBar/>
            <CartSection data={eventData}/>                 
        </div>
    )
}

export default BookingDetails;
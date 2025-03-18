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
            location: "Grand Theater",
            client: { name: "Sarah Johans", email: "sarah@example.com", phone: "+1 (111) 222-3333" },
            details: {
                eventType: "Wedding",
                dateTime: "2025-03-15 14:00",
                duration: "5 hours",
                location: "Grand Theater",
                packageType: "Platinum",
                price: "$2500"
            }
        },
        {
            picture: "/sports.jpg",
            name: "Mahinda",
            status: "Live",
            time: "6:30 PM",
            event: "Sports",
            location: "City Stadium",
            client: { name: "Mahinda", email: "mahinda@example.com", phone: "+1 (444) 555-6666" },
            details: {
                eventType: "Sports",
                dateTime: "2025-04-10 18:30",
                duration: "3 hours",
                location: "City Stadium",
                packageType: "Gold",
                price: "$1500"
            }
        },
        {
            picture: "/art.jpg",
            name: "Michael Brown",
            status: "Upcoming",
            time: "11:00 AM",
            event: "Art Exhibition",
            location: "Modern Art Museum",
            client: { name: "Michael Brown", email: "michael@example.com", phone: "+1 (321) 654-0987" },
            details: {
                eventType: "Art Exhibition",
                dateTime: "2025-09-22 11:00",
                duration: "5 hours",
                location: "Modern Art Museum",
                packageType: "Silver",
                price: "$1800"
            }
        },
        {
            picture: "/movie.jpg",
            name: "Chris Evans",
            status: "Upcoming",
            time: "8:30 PM",
            event: "Movie Premiere",
            location: "Downtown Cinema",
            client: { name: "Chris Evans", email: "chris@example.com", phone: "+1 (444) 777-9999" },
            details: {
                eventType: "Movie Premiere",
                dateTime: "2025-10-30 20:30",
                duration: "3 hours",
                location: "Downtown Cinema",
                packageType: "Red Carpet",
                price: "$7000"
            }
        },
        {
            picture: "/wedding.jpg",
            name: "Sophia Lee",
            status: "Live",
            time: "5:00 PM",
            event: "Wedding Show",
            location: "Luxury Hotel",
            client: { name: "Sophia Lee", email: "sophia@example.com", phone: "+1 (999) 888-7777" },
            details: {
                eventType: "Wedding Show",
                dateTime: "2025-08-15 17:00",
                duration: "3 hours",
                location: "Luxury Hotel",
                packageType: "Exclusive",
                price: "$6000"
            }
        },
    ];  

    return(
        <div>
            <SearchBar/>
            <CartSection data={eventData}/>                 
        </div>
    )
}

export default BookingDetails;
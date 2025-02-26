
// "use client";
// //import React, { useState } from "react";
// import styles from "./CalendarWidgetContainer.module.css";
// import Sidebar from "./Sidebar/Sidebar";
// import Header from "./Header/Header";
// import CalendarWidget from "./CalendarWidget/CalendarWidget";
// //import CalendarWorklist from "./CalendarWidget/CalendarWorklist";
// // import EventList from "../../components/Dashboard/EventList/EventList";
// // import ProfileOverview from "../../components/Dashboard/ProfileOverview/ProfileOverview";
// // import Inbox from "../../components/Dashboard/Inbox/Inbox";

// import React, { useState, useEffect } from "react";
// import {
//   formatDate,
//   DateSelectArg,
//   EventClickArg,
//   EventApi,
// } from "@fullcalendar/core";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/app/components/Calendar/ui/dialog";
// const CalendarWidgetContainer: React.FC = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [newEventTitle, setNewEventTitle] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);



//   useEffect(() => {
//     // Load events from local storage when the component mounts
//     if (typeof window !== "undefined") {
//       const savedEvents = localStorage.getItem("events");
//       if (savedEvents) {
//         setCurrentEvents(JSON.parse(savedEvents));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Save events to local storage whenever they change
//     if (typeof window !== "undefined") {
//       localStorage.setItem("events", JSON.stringify(currentEvents));
//     }
//   }, [currentEvents]);

//   const handleDateClick = (selected: DateSelectArg) => {
//     setSelectedDate(selected);
//     setIsDialogOpen(true);
//   };

//   const handleEventClick = (selected: EventClickArg) => {
//     // Prompt user for confirmation before deleting an event
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event "${selected.event.title}"?`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setNewEventTitle("");
//   };

//   const handleAddEvent = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newEventTitle && selectedDate) {
//       const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
//       calendarApi.unselect(); // Unselect the date range.

//       const newEvent = {
//         id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
//         title: newEventTitle,
//         start: selectedDate.start,
//         end: selectedDate.end,
//         allDay: selectedDate.allDay,
//       };

//       calendarApi.addEvent(newEvent);
//       handleCloseDialog();
//     }
//   };




//   const handlePrevMonth = () => {
//     setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
//     if (currentMonth === 0) {
//       setCurrentYear(currentYear - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
//     if (currentMonth === 11) {
//       setCurrentYear(currentYear + 1);
//     }
//   };

//   return (
//     <div className={styles.CalendarWidgetContainer}>
      
//       <Sidebar />
//       <div className={styles.mainContent}>
//         <div className={styles.calendarWrapper}>
//           <CalendarWidget
//             currentMonth={currentMonth}
//             currentYear={currentYear}
//             onPrevMonth={handlePrevMonth}
//             onNextMonth={handleNextMonth}
//           />
          
//           {/* <Header /> */}
          
//           <div className={styles.grid}>
//             <div className={styles.leftColumn}>
//               {/* <EventList /> */}
              
//             </div>

//             {/* <div className={styles.rightColumn}>
//               <ProfileOverview />
//               <Inbox />
//               <CalendarWorklist />
//             </div> */}
//           </div>
//         </div>
//       </div>
//       {/* <div className="min-h-screen bg-gray-50 flex items-center justify-center"> */}
//           {/* <CalendarWorklist/> */}
//       {/* </div> */}
      
//       <div className="flex w-full px-10 justify-start items-start gap-8">
//         <div className="w-3/12">
//           <div className="py-10 text-2xl font-extrabold px-7">
//             Calendar Events
//           </div>
//           <ul className="space-y-4">
//             {currentEvents.length <= 0 && (
//               <div className="italic text-center text-gray-400">
//                 No Events Present
//               </div>
//             )}

//             {currentEvents.length > 0 &&
//               currentEvents.map((event: EventApi) => (
//                 <li
//                   className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
//                   key={event.id}
//                 >
//                   {event.title}
//                   <br />
//                   <label className="text-slate-950">
//                     {formatDate(event.start!, {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}{" "}
//                     {/* Format event start date */}
//                   </label>
//                 </li>
//               ))}
//           </ul>
//         </div>

//         <div className="w-9/12 mt-8">
//           <FullCalendar
//             height={"85vh"}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
//             }} // Set header toolbar options.
//             initialView="dayGridMonth" // Initial view mode of the calendar.
//             editable={true} // Allow events to be edited.
//             selectable={true} // Allow dates to be selectable.
//             selectMirror={true} // Mirror selections visually.
//             dayMaxEvents={true} // Limit the number of events displayed per day.
//             select={handleDateClick} // Handle date selection to create new events.
//             eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
//             eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
//             initialEvents={
//               typeof window !== "undefined"
//                 ? JSON.parse(localStorage.getItem("events") || "[]")
//                 : []
//             } // Initial events loaded from local storage.
//           />
//         </div>
//       </div>

//       {/* Dialog for adding new events */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Event Details</DialogTitle>
//           </DialogHeader>
//           <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
//             <input
//               type="text"
//               placeholder="Event Title"
//               value={newEventTitle}
//               onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
//               required
//               className="border border-gray-200 p-3 rounded-md text-lg"
//             />
//             <button
//               className="bg-green-500 text-white p-3 mt-5 rounded-md"
//               type="submit"
//             >
//               Add
//             </button>{" "}
//             {/* Button to submit new event */}
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CalendarWidgetContainer;



"use client";

import styles from "./CalendarWidgetContainer.module.css";
import Sidebar from "./Sidebar/Sidebar";
import CalendarWidget from "./CalendarWidget/CalendarWidget";
import React, { useState, useEffect } from "react";
import { formatDate, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/Calendar/ui/dialog";

const CalendarWidgetContainer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event "${selected.event.title}"?`)) {
      selected.event.remove();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

    const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className={styles.CalendarWidgetContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* <div className={styles.calendarWrapper}>
        <CalendarWidget
             currentMonth={currentMonth}
             currentYear={currentYear}
             onPrevMonth={handlePrevMonth}
             onNextMonth={handleNextMonth}
           />
      </div> */}
        
          {/* <div className="flex w-full px-10 justify-start items-start gap-8">
            <div className="w-3/12">
              <div className="py-10 text-2xl font-extrabold px-7">Calendar Events</div>
              <ul className="space-y-4">
                {currentEvents.length === 0 && (
                  <div className="italic text-center text-gray-400">No Events Present</div>
                )}
                {currentEvents.map((event: EventApi) => (
                  <li key={event.id} className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800">
                    {event.title}
                    <br />
                    <label className="text-slate-950">
                      {formatDate(event.start!, { year: "numeric", month: "short", day: "numeric" })}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-9/12 mt-8">
              <FullCalendar
                height="85vh"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={typeof window !== "undefined" ? JSON.parse(localStorage.getItem("events") || "[]") : []}
              />
            </div>
          </div>
        </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent} className="space-x-5 mb-4">
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-200 p-3 rounded-md text-lg"
            />
            <button className="bg-green-500 text-white p-3 mt-5 rounded-md" type="submit">Add</button>
          </form>
        </DialogContent>
      </Dialog> */}
      <div className={styles.calendarContainer}>
          <div className={styles.sidebar}>
            <div className={styles.title}>Calendar Events</div>
            <ul className={styles.eventList}>
              {currentEvents.length === 0 && (
                <div className={styles.noEvents}>No Events Present</div>
              )}
              {currentEvents.map((event: EventApi) => (
                <li key={event.id} className={styles.eventItem}>
                  {event.title}
                  <br />
                  <label className={styles.eventDate}>
                    {formatDate(event.start!, { year: "numeric", month: "short", day: "numeric" })}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.fullCalendarContainer}>
            <FullCalendar
              height="85vh"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={typeof window !== "undefined" ? JSON.parse(localStorage.getItem("events") || "[]") : []}
            />
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle className={styles.dialogTitle}>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEvent} className={styles.formContainer}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className={styles.eventInput}
            />
            <button className={styles.addButton} type="submit">Add</button>
          </form>
        </DialogContent>
      </Dialog>




    </div>
  );
};

export default CalendarWidgetContainer;
"use client";

import styles from "./CalendarWidgetContainer.module.css";
import Sidebar from "./Sidebar/Sidebar";
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
                right: "dayGridMonth,timeGridWeek,timeGridDay",
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
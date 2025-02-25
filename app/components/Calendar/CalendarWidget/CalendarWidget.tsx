
"use client";
// import React from "react";
import React, { useState, useEffect } from "react";
import styles from "./CalendarWidget.module.css";

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarWidget: React.FC<CalendarProps> = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
}) => {
  // const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // const getMonthName = (month: number) =>
  //   new Date(currentYear, month).toLocaleString("default", { month: "long" });

  // const renderDays = () => {
  //   const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  //   const calendarDays = Array.from({ length: 42 }, (_, index) => {
  //     const day = index - firstDay + 1;
  //     return day > 0 && day <= daysInMonth ? day : "";
  //   });

  const today = new Date();
  const currentDay = today.getDate();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  const [selectedDay, setSelectedDay] = useState<number | null>(
    isCurrentMonth ? currentDay : null
  );

  useEffect(() => {
    // Auto-select current day if in the current month, otherwise reset selection
    if (isCurrentMonth) {
      setSelectedDay(currentDay);
    } else {
      setSelectedDay(null);
    }
  }, [currentMonth, currentYear, isCurrentMonth, currentDay]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getMonthName = (month: number) =>
    new Date(currentYear, month).toLocaleString("default", { month: "long" });

  const handleDayClick = (day: number) => {
    if (day) setSelectedDay(day);
  };

  // const renderDays = () => {
  //   const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  //   const calendarDays = Array.from({ length: 42 }, (_, index) => {
  //     const day = index - firstDay + 1;
  //     return day > 0 && day <= daysInMonth ? day : "";
  //   });

    const renderDays = () => {
      const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
      const totalSlots = 42; // 6 weeks x 7 days

      const calendarDays = Array.from({ length: totalSlots }, (_, index) => {
        const day = index - firstDayOfWeek + 1;
        return day > 0 && day <= daysInMonth ? day : null;
      });

    return calendarDays.map((day, index) => (
        // <div
        //   key={index}
        //   className={`${styles.day} ${day ? styles.activeDay : ""}`}
        //   aria-hidden={!day}
        // >
        //   {day}
        // </div>

        <div
          key={index}
          className={`${styles.day} ${day ? styles.activeDay : ""} ${
            day === selectedDay ? styles.selectedDay : ""
          }`}
          onClick={() => day && handleDayClick(day)}
          aria-hidden={!day}
        >
          {day}
        </div>
      ));
    };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.navButton}
          onClick={onPrevMonth}
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <span className={styles.monthYear} aria-live="polite">
          {getMonthName(currentMonth)} {currentYear}
        </span>
        <button
          className={styles.navButton}
          onClick={onNextMonth}
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>
      <div className={styles.calendarGrid}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className={styles.weekday} aria-hidden="true">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      <div className={styles.calendarFooter}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.applyBtn}>Apply</button>
      </div>
      <div className={styles.createTaskContainer}>
            <button className={styles.createTaskButton}>+ Create Task</button>
      </div>
      
    </div>
    
    
    
  );
};

export default CalendarWidget;

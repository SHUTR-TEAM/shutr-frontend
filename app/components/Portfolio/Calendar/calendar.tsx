"use client";
//import React from "react";
import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  currentYear,
  onPrevMonth,
  onNextMonth,
}) => {
  // const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // const getMonthName = (month: number) =>
  //   new Date(currentYear, month).toLocaleString("default", { month: "long" });

  // const handleDayClick = (day: number) => {
  //   setSelectedDay(day);
  // };
  
  
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
  }, [currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const getMonthName = (month: number) =>
    new Date(currentYear, month).toLocaleString("default", { month: "long" });

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const renderDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDays = Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : "";
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
    </div>
  );
};

export default Calendar;

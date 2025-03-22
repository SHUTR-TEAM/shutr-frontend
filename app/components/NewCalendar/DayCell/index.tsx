"use client";

import { useState } from "react";
import styles from "./index.module.css";

interface Booking {
  _id: string;
  client: {
    first_name: string;
    last_name: string;
  };
  event: {
    type: string;
    date: string;
  };
  status: string;
}

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface DayCellProps {
  date: Date;
  bookings: Booking[];
  todos: Todo[];
  onClick: () => void;
  isToday: boolean;
}

export default function DayCell({
  date,
  bookings,
  todos,
  onClick,
  isToday,
}: DayCellProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <div
      className={`${styles.dayCell} ${isToday ? styles.today : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.dayNumber}>{date.getDate()}</div>

      <div className={styles.indicators}>
        {bookings?.length > 0 && (
          <div className={styles.bookingIndicator}>
            {bookings?.length} {bookings?.length === 1 ? "booking" : "bookings"}
          </div>
        )}

        {todos.length > 0 && (
          <div className={styles.todoIndicator}>
            {todos.length} {todos.length === 1 ? "todo" : "todos"}
          </div>
        )}
      </div>

      {showDetails && (bookings?.length > 0 || todos.length > 0) && (
        <div className={styles.detailsPopup}>
          {bookings?.length > 0 && (
            <div className={styles.bookingsList}>
              <h4>Bookings</h4>
              <ul>
                {bookings?.map((booking) => (
                  <li key={booking._id}>
                    {booking.client.first_name} {booking.client.last_name} -{" "}
                    {booking.event.type}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {todos.length > 0 && (
            <div className={styles.todosList}>
              <h4>Todos</h4>
              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className={todo.completed ? styles.completedTodo : ""}
                  >
                    {todo.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

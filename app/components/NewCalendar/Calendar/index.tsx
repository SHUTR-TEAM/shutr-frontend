"use client";

import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import DayCell from "../DayCell";
import DetailedDayView from "../DetailedDayView";

// Types based on your MongoDB models
interface Client {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nic: string;
  address?: string;
}

interface Event {
  address: string;
  date: string;
  event_setting: string;
  guest_count: number;
  type: string;
}

interface Payment {
  deposit_paid: boolean;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  payment_status: string;
}

interface Booking {
  _id: string;
  photographer_id: string;
  client_id: string;
  client: Client;
  event: Event;
  package_id?: string;
  payment?: Payment;
  status: string;
  additional_notes?: string;
  cancellation_policy_agreed: boolean;
  terms_and_conditions_agreed: boolean;
  created_at: string;
  updated_at: string;
}

interface Todo {
  _id: string;
  date: string;
  text: string;
  completed: boolean;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Fetch bookings for the current month
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/booking/get-all?month=${
            currentMonth + 1
          }&year=${currentYear}&photographer_id=67dd71aee5948704445e32f0`
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `/api/todos?month=${currentMonth + 1}&year=${currentYear}`
        );
        if (response.ok) {
          const data = await response.json();
          setTodos(data.todos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchBookings();
    fetchTodos();
  }, [currentMonth, currentYear]);

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      days.push(date);
    }

    return days;
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Handle day click
  const handleDayClick = (date: Date) => {
    setSelectedDay(date);
  };

  // Handle adding a todo
  const handleAddTodo = async (text: string) => {
    if (!selectedDay || !text.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDay.toISOString(),
          text,
          completed: false,
        }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Handle updating a todo
  const handleUpdateTodo = async (todoId: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: todoId,
          ...updates,
        }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(
          todos.map((todo) => (todo._id === todoId ? updatedTodo : todo))
        );
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`/api/todos?id=${todoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== todoId));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return bookings?.filter((booking) => {
      const bookingDate = new Date(booking.event.date);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get todos for a specific day
  const getTodosForDay = (date: Date) => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.navButton}
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          className={styles.navButton}
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.weekdaysHeader}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {calendarDays.map((day, index) => (
          <div key={index} className={styles.dayCell}>
            {day && (
              <DayCell
                date={day}
                bookings={getBookingsForDay(day)}
                todos={getTodosForDay(day)}
                onClick={() => handleDayClick(day)}
                isToday={
                  day.getDate() === new Date().getDate() &&
                  day.getMonth() === new Date().getMonth() &&
                  day.getFullYear() === new Date().getFullYear()
                }
              />
            )}
          </div>
        ))}
      </div>

      {selectedDay && (
        <DetailedDayView
          date={selectedDay}
          bookings={getBookingsForDay(selectedDay)}
          todos={getTodosForDay(selectedDay)}
          onClose={() => setSelectedDay(null)}
          onAddTodo={handleAddTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}

      {isLoading && (
        <div className={styles.loading}>
          <Loader2 size={20} className="animate-spin" />
          Loading bookings...
        </div>
      )}
    </div>
  );
}

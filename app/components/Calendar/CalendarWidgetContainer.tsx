"use client";

// CalendarWidgetContainer.tsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, X, Check, Calendar as CalendarIcon, Clock, Menu } from 'lucide-react';
import axios from 'axios';
import styles from './CalendarWidgetContainer.module.css';

// Define interfaces for our data structures
interface Client {
  first_name: string;
  last_name: string;
}

interface Event {
  type: string;
  date: string;
  address: string;
}

interface Todo {
  id: string;
  task: string;
}

interface Booking {
  _id: string;
  client: Client;
  event: Event;
  status: string;
  todos?: Todo[];
}

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
}

interface EditingTodo {
  id: string | null;
  task: string;
}

type ViewType = 'month' | 'week' | 'day';

export default function Calendar(): JSX.Element {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingTodo, setEditingTodo] = useState<EditingTodo>({ id: null, task: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>('month');

  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchBookingsForPeriod();
  }, [currentDate, viewType]);

  const fetchBookingsForPeriod = async (): Promise<void> => {
    setIsLoading(true);
    try {
      let url = '';
      let startDate, endDate;

      if (viewType === 'month') {
        // Fetch bookings for the entire month
        url = `/api/bookings/month?year=${currentDate.getFullYear()}&month=${currentDate.getMonth() + 1}`;
      } else if (viewType === 'week') {
        // Calculate start and end of the week
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - currentDate.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        
        startDate = formatDateForAPI(start);
        endDate = formatDateForAPI(end);
        url = `/api/bookings/range?startDate=${startDate}&endDate=${endDate}`;
      } else if (viewType === 'day') {
        // Fetch bookings for a specific day
        const formattedDate = formatDateForAPI(currentDate);
        url = `/api/bookings/day?date=${formattedDate}`;
      }
      console.log("Fetching bookings from URL:", url);//add new

      const response = await axios.get<Booking[]>(url);
      setBookings(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings');
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const fetchBookingDetails = async (bookingId: string): Promise<void> => {
    try {
      const response = await axios.get<Booking>(`/api/bookings/${bookingId}`);
      setSelectedBooking(response.data);
      setTodos(response.data.todos || []);
    } catch (err) {
      console.error('Error fetching booking details:', err);
      setError('Failed to load booking details');
    }
  };

  const addTodo = async (): Promise<void> => {
    if (!newTodo.trim() || !selectedBooking) return;
    
    try {
      await axios.post(`/api/bookings/${selectedBooking._id}/todo`, { task: newTodo });
      
      // Create a temporary ID for the new todo before the refresh
      const tempId = `temp-${Date.now()}`;
      setTodos([...todos, { id: tempId, task: newTodo }]);
      setNewTodo('');
      
      // Refresh booking details
      fetchBookingDetails(selectedBooking._id);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
    }
  };

  const updateTodo = async (): Promise<void> => {
    if (!editingTodo.task.trim() || !selectedBooking || !editingTodo.id) return;
    
    try {
      await axios.post(`/api/bookings/${selectedBooking._id}/todo/${editingTodo.id}/edit`, { task: editingTodo.task });
      
      // Update the todos list
      const updatedTodos = todos.map(todo => 
        todo.id === editingTodo.id ? { ...todo, task: editingTodo.task } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo({ id: null, task: '' });
      
      // Refresh booking details
      fetchBookingDetails(selectedBooking._id);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (todoId: string): Promise<void> => {
    if (!selectedBooking) return;
    
    try {
      await axios.post(`/api/bookings/${selectedBooking._id}/todo/${todoId}/delete`);
      
      // Update the todos list
      const updatedTodos = todos.filter(todo => todo.id !== todoId);
      setTodos(updatedTodos);
      
      // Refresh booking details
      fetchBookingDetails(selectedBooking._id);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  // Navigation functions for different views
  const handlePrevious = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (viewType === 'month') {
        newDate.setMonth(prev.getMonth() - 1);
      } else if (viewType === 'week') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() - 1);
      }
      return newDate;
    });
  };

  const handleNext = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (viewType === 'month') {
        newDate.setMonth(prev.getMonth() + 1);
      } else if (viewType === 'week') {
        newDate.setDate(prev.getDate() + 7);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const handleTodayClick = (): void => {
    setCurrentDate(new Date());
  };

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Last day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    const days: CalendarDay[] = [];
    
    // Add days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayOfPrevMonth - i),
        currentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true
      });
    }
    
    // Add days from next month to complete the calendar grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        currentMonth: false
      });
    }
    
    return days;
  };

  const getWeekDays = (): Date[] => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
  };

  const getBookingsForDate = (date: Date): Booking[] => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.event.date);
      return bookingDate.getDate() === date.getDate() && 
             bookingDate.getMonth() === date.getMonth() && 
             bookingDate.getFullYear() === date.getFullYear();
    });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const closeBookingDetails = (): void => {
    setSelectedBooking(null);
    setTodos([]);
    setNewTodo('');
    setEditingTodo({ id: null, task: '' });
  };

  const getStatusClassName = (status: string): string => {
    return `${styles.status} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}`]}`;
  };

  // View title based on current view and date
  const getViewTitle = (): string => {
    if (viewType === 'month') {
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewType === 'week') {
      const weekDays = getWeekDays();
      const firstDay = weekDays[0];
      const lastDay = weekDays[6];
      
      // If same month
      if (firstDay.getMonth() === lastDay.getMonth()) {
        return `${firstDay.getDate()} - ${lastDay.getDate()} ${months[firstDay.getMonth()]} ${firstDay.getFullYear()}`;
      } 
      // If different months
      else {
        return `${firstDay.getDate()} ${months[firstDay.getMonth()]} - ${lastDay.getDate()} ${months[lastDay.getMonth()]} ${firstDay.getFullYear()}`;
      }
    } else {
      return `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };



  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const handleDateClick = (dateStr: string) => {
  //   setSelectedDate(dateStr);
  //   setIsTaskModalOpen(true);
  // };
  
  // const handleAddTask = async () => {
  //   if (!newTask.trim()) return;
  
  //   try {
  //     const response = await axios.post(`/api/bookings/${selectedDate}/add-task`, {
  //       task: newTask,
  //     });
  
  //     if (response.status === 200) {
  //       alert("Task added successfully!");
  //       setIsTaskModalOpen(false);
  //       setNewTask("");
  //       fetchBookingsForPeriod(); // Refresh calendar
  //     }
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //     alert("Failed to add task.");
  //   }
  // };


  useEffect(() => {
    if (isTaskModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTaskModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTaskModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  useEffect(() => {
    if (isTaskModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTaskModalOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTaskModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchBookingsForMonth = async (year: number, month: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.get<Booking[]>(`/api/bookings/month?year=${year}&month=${month}`);
      setBookings(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings");
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(`/api/bookings/${selectedDate}/add-task`, {
        task: newTask,
      });

      if (response.status === 200) {
        alert("Task added successfully!");
        setIsTaskModalOpen(false);
        setNewTask("");
        fetchBookingsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };


  return (
    <div className={styles.calendarContainer}>
      {/* Header */}
      <header className={styles.calendarHeader}>
        <h1>Booking Calendar</h1>
      </header>

      {/* View Selector */}
      <div className={styles.viewSelector}>
        <button 
          className={`${styles.viewButton} ${viewType === 'month' ? styles.activeView : ''}`}
          onClick={() => setViewType('month')}
        >
          <CalendarIcon size={16} />
          Month
        </button>
        <button 
          className={`${styles.viewButton} ${viewType === 'week' ? styles.activeView : ''}`}
          onClick={() => setViewType('week')}
        >
          <Menu size={16} />
          Week
        </button>
        <button 
          className={`${styles.viewButton} ${viewType === 'day' ? styles.activeView : ''}`}
          onClick={() => setViewType('day')}
        >
          <Clock size={16} />
          Day
        </button>
        <button 
          className={styles.todayButton}
          onClick={handleTodayClick}
        >
          Today
        </button>
      </div>

      {/* Main Content */}
      <main className={styles.calendarMain}>
        {/* Calendar */}
        <div className={styles.calendarGridContainer}>
          {/* Calendar Controls */}
          <div className={styles.calendarControls}>
            <div className={styles.monthSelector}>
              <button onClick={handlePrevious} className={styles.monthNavBtn}>
                <ChevronLeft size={24} />
              </button>
              <h2 className={styles.currentMonth}>
                {getViewTitle()}
              </h2>
              <button onClick={handleNext} className={styles.monthNavBtn}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Month View */}
          {viewType === 'month' && (
            <div className={styles.calendarGrid}>
              {/* Day Headers */}
              {daysOfWeek.map(day => (
                <div key={day} className={styles.dayHeader}>
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {getCalendarDays().map((day, index) => {
                const dayBookings = getBookingsForDate(day.date);
                const isToday = day.date.toDateString() === new Date().toDateString();
                
                const dayClassName = `${styles.calendarDay} ${day.currentMonth ? styles.currentMonth : styles.otherMonth} ${isToday ? styles.today : ''}`;
                
                return (
                  <div 
                    key={index} 
                    className={dayClassName}
                    onClick={() => {
                      setCurrentDate(day.date);
                      setViewType('day');
                    }}
                  >
                    <div className={styles.dayHeaderCell}>
                      <span className={styles.dayNumber}>
                        {day.date.getDate()}
                      </span>
                      {isToday && (
                        <span className={styles.todayLabel}>Today</span>
                      )}
                    </div>
                    
                    {/* Bookings for this day */}
                    <div className={styles.dayBookings}>
                      {dayBookings.slice(0, 3).map(booking => (
                        <div 
                          key={booking._id} 
                          className={styles.bookingItem}
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchBookingDetails(booking._id);
                          }}
                        >
                          <div className={styles.bookingType}>{booking.event.type}</div>
                          <div className={styles.bookingClient}>{booking.client.first_name} {booking.client.last_name}</div>
                        </div>
                      ))}
                      {dayBookings.length > 3 && (
                        <div className={styles.moreBookings}>
                          +{dayBookings.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Week View */}
          {viewType === 'week' && (
            <div className={styles.weekView}>
              {/* Week Headers */}
              <div className={styles.weekDayHeaders}>
                {getWeekDays().map((day, index) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  return (
                    <div 
                      key={index} 
                      className={`${styles.weekDayHeader} ${isToday ? styles.todayHeader : ''}`}
                      onClick={() => {
                        setCurrentDate(day);
                        setViewType('day');
                      }}
                    >
                      <div className={styles.weekDayName}>{daysOfWeek[day.getDay()]}</div>
                      <div className={styles.weekDayNumber}>{day.getDate()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Week Content */}
              <div className={styles.weekContent}>
                {getWeekDays().map((day, index) => {
                  const dayBookings = getBookingsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`${styles.weekDay} ${isToday ? styles.todayColumn : ''}`}
                    >
                      {dayBookings.length === 0 ? (
                        <div className={styles.noBookings}>No bookings</div>
                      ) : (
                        dayBookings.map(booking => (
                          <div 
                            key={booking._id} 
                            className={styles.weekBookingItem}
                            onClick={() => fetchBookingDetails(booking._id)}
                          >
                            <div className={styles.bookingTime}>
                              {formatTime(booking.event.date)}
                            </div>
                            <div className={styles.bookingType}>{booking.event.type}</div>
                            <div className={styles.bookingClient}>
                              {booking.client.first_name} {booking.client.last_name}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day View */}
          {viewType === 'day' && (
            <div className={styles.dayView}>
              <div className={styles.dayViewHeader}>
                <h3>{currentDate.getDate()} {months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
              </div>
              
              <div className={styles.dayViewContent}>
                {/* Hours of the day */}
                <div className={styles.dayViewHours}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className={styles.hourSlot}>
                      <div className={styles.hourLabel}>
                        {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bookings for the day */}
                <div className={styles.dayViewBookings}>
                  {getBookingsForDate(currentDate).length === 0 ? (
                    <div className={styles.noBookings}>No bookings for this day</div>
                  ) : (
                    getBookingsForDate(currentDate).map(booking => {
                      const bookingDate = new Date(booking.event.date);
                      const hour = bookingDate.getHours();
                      const minute = bookingDate.getMinutes();
                      
                      // Calculate top position based on time
                      const topPosition = (hour * 60 + minute) / 1440 * 100;
                      
                      return (
                        <div 
                          key={booking._id} 
                          className={styles.dayBookingItem}
                          style={{ top: `${topPosition}%` }}
                          onClick={() => fetchBookingDetails(booking._id)}
                        >
                          <div className={styles.bookingTime}>
                            {formatTime(booking.event.date)}
                          </div>
                          <div className={styles.bookingType}>{booking.event.type}</div>
                          <div className={styles.bookingClient}>
                            {booking.client.first_name} {booking.client.last_name}
                          </div>
                          <div className={styles.bookingAddress}>
                            {booking.event.address}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {isLoading && <div className={styles.loadingIndicator}>Loading bookings...</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>

        {/* Booking Details Sidebar */}
        {selectedBooking && (
          <div className={styles.bookingSidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Booking Details</h3>
              <button onClick={closeBookingDetails} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.bookingInfo}>
              <h4 className={styles.bookingType}>{selectedBooking.event.type}</h4>
              <p>
                <span className={styles.label}>Date:</span> {formatDate(new Date(selectedBooking.event.date))}
              </p>
              <p>
                <span className={styles.label}>Time:</span> {formatTime(selectedBooking.event.date)}
              </p>
              <p>
                <span className={styles.label}>Client:</span> {selectedBooking.client.first_name} {selectedBooking.client.last_name}
              </p>
              <p>
                <span className={styles.label}>Address:</span> {selectedBooking.event.address}
              </p>
              <p>
                <span className={styles.label}>Status:</span> 
                <span className={getStatusClassName(selectedBooking.status)}>
                  {selectedBooking.status}
                </span>
              </p>
            </div>

            {/* Todo List */}
            <div className={styles.todoSection}>
              <h4>Todo List</h4>
              
              {/* Add Todo Form */}
              <div className={styles.addTodoForm}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                  className={styles.todoInput}
                />
                <button
                  onClick={addTodo}
                  className={styles.addTodoBtn}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Todo Items */}
              <ul className={styles.todoList}>
                {todos.map((todo, index) => (
                  <li key={index} className={styles.todoItem}>
                    {editingTodo.id === todo.id ? (
                      <div className={styles.editTodoForm}>
                        <input
                          type="text"
                          value={editingTodo.task}
                          onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })}
                          className={styles.todoEditInput}
                        />
                        <button
                          onClick={updateTodo}
                          className={styles.saveBtn}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingTodo({ id: null, task: '' })}
                          className={styles.cancelBtn}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className={styles.todoText}>{todo.task}</span>
                        <div className={styles.todoActions}>
                          <button
                            onClick={() => setEditingTodo({ id: todo.id, task: todo.task })}
                            className={styles.editBtn}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className={styles.deleteBtn}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
                {todos.length === 0 && (
                  <li className={styles.emptyTodoList}>No todos yet</li>
                )}
              </ul>
            </div>
          </div>
        )}
{/* ////////////////////////////// */}
        {/* {isTaskModalOpen && (
          <div className="task-modal">
            <h3>Add Task for {selectedDate}</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
          </div>
        )} */}


        {/* Task Modal */}
        {isTaskModalOpen && (
          <>
            {/* Modal Background Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsTaskModalOpen(false)}></div>

            {/* Modal Box */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96 z-50">
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                Add Task for {selectedDate}
              </h3>

              {/* Task Input */}
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md" onClick={() => setIsTaskModalOpen(false)}>
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={handleAddTask}>
                  Add Task
                </button>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}








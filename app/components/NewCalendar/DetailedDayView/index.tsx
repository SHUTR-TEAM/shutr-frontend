"use client";

import type React from "react";

import { useState } from "react";
import styles from "./index.module.css";
import {
  X,
  Plus,
  Edit,
  Trash2,
  Check,
  XIcon,
  Calendar,
  MapPin,
  Users,
  Tag,
  CreditCard,
  AlertCircle,
} from "lucide-react";

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

interface DetailedDayViewProps {
  date: Date;
  bookings: Booking[];
  todos: Todo[];
  onClose: () => void;
  onAddTodo: (text: string) => Promise<void>;
  onUpdateTodo: (todoId: string, updates: Partial<Todo>) => Promise<void>;
  onDeleteTodo: (todoId: string) => Promise<void>;
}

export default function DetailedDayView({
  date,
  bookings,
  todos,
  onClose,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
}: DetailedDayViewProps) {
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      await onAddTodo(newTodoText);
      setNewTodoText("");
    }
  };

  const startEditingTodo = (todo: Todo) => {
    setEditingTodoId(todo._id);
    setEditingTodoText(todo.text);
  };

  const cancelEditingTodo = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const saveEditedTodo = async (todoId: string) => {
    if (editingTodoText.trim()) {
      await onUpdateTodo(todoId, { text: editingTodoText });
      setEditingTodoId(null);
    }
  };

  const toggleTodoCompletion = async (todo: Todo) => {
    await onUpdateTodo(todo._id, { completed: !todo.completed });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return styles.statusConfirmed;
      case "pending":
        return styles.statusPending;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return styles.statusConfirmed;
      case "pending":
        return styles.statusPending;
      case "overdue":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Todos Section */}
          <section className={styles.todosSection}>
            <h3>Todos</h3>

            <form className={styles.addTodoForm} onSubmit={handleAddTodo}>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a new todo..."
                className={styles.todoInput}
              />
              <button
                type="submit"
                className={styles.addButton}
                aria-label="Add todo"
              >
                <Plus size={18} />
              </button>
            </form>

            <ul className={styles.todoList}>
              {todos.length === 0 ? (
                <li className={styles.emptyState}>
                  No todos for this day. Add one above!
                </li>
              ) : (
                todos.map((todo) => (
                  <li key={todo._id} className={styles.todoItem}>
                    {editingTodoId === todo._id ? (
                      <div className={styles.editTodoForm}>
                        <input
                          type="text"
                          value={editingTodoText}
                          onChange={(e) => setEditingTodoText(e.target.value)}
                          className={styles.editTodoInput}
                          autoFocus
                        />
                        <div className={styles.editActions}>
                          <button
                            onClick={() => saveEditedTodo(todo._id)}
                            className={styles.saveButton}
                            aria-label="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEditingTodo}
                            className={styles.cancelButton}
                            aria-label="Cancel"
                          >
                            <XIcon size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={styles.todoContent}>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodoCompletion(todo)}
                            className={styles.todoCheckbox}
                            id={`todo-${todo._id}`}
                          />
                          <label
                            htmlFor={`todo-${todo._id}`}
                            className={
                              todo.completed ? styles.completedTodo : ""
                            }
                          >
                            {todo.text}
                          </label>
                        </div>
                        <div className={styles.todoActions}>
                          <button
                            onClick={() => startEditingTodo(todo)}
                            className={styles.editButton}
                            aria-label="Edit todo"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => onDeleteTodo(todo._id)}
                            className={styles.deleteButton}
                            aria-label="Delete todo"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Bookings Section */}
          <section className={styles.bookingsSection}>
            <h3>Bookings</h3>

            {bookings?.length === 0 ? (
              <div className={styles.emptyState}>
                No bookings scheduled for this day.
              </div>
            ) : (
              <div className={styles.bookingsList}>
                {bookings?.map((booking) => (
                  <div key={booking._id} className={styles.bookingCard}>
                    <div className={styles.bookingHeader}>
                      <h4>
                        {booking.client.first_name} {booking.client.last_name}
                      </h4>
                      <span
                        className={`${styles.bookingStatus} ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className={styles.bookingDetails}>
                      <div className={styles.detailItem}>
                        <Calendar size={16} />
                        <span>
                          <strong>Event:</strong> {booking.event.type}
                        </span>
                      </div>

                      <div className={styles.detailItem}>
                        <MapPin size={16} />
                        <span>
                          <strong>Location:</strong> {booking.event.address}
                        </span>
                      </div>

                      <div className={styles.detailItem}>
                        <Users size={16} />
                        <span>
                          <strong>Guests:</strong> {booking.event.guest_count}
                        </span>
                      </div>

                      <div className={styles.detailItem}>
                        <Tag size={16} />
                        <span>
                          <strong>Setting:</strong>{" "}
                          {booking.event.event_setting}
                        </span>
                      </div>

                      {booking.payment && (
                        <div className={styles.paymentDetails}>
                          <h5>Payment Information</h5>

                          <div className={styles.detailItem}>
                            <CreditCard size={16} />
                            <span>
                              <strong>Total:</strong> $
                              {booking.payment.total_amount.toFixed(2)}
                            </span>
                          </div>

                          <div className={styles.detailItem}>
                            <CreditCard size={16} />
                            <span>
                              <strong>Paid:</strong> $
                              {booking.payment.amount_paid.toFixed(2)}
                            </span>
                          </div>

                          <div className={styles.detailItem}>
                            <CreditCard size={16} />
                            <span>
                              <strong>Balance:</strong> $
                              {booking.payment.balance_due.toFixed(2)}
                            </span>
                          </div>

                          <div className={styles.detailItem}>
                            <CreditCard size={16} />
                            <span>
                              <strong>Status:</strong>
                              <span
                                className={`${
                                  styles.paymentStatus
                                } ${getPaymentStatusColor(
                                  booking.payment.payment_status
                                )}`}
                              >
                                {booking.payment.payment_status}
                              </span>
                            </span>
                          </div>

                          <div className={styles.detailItem}>
                            <CreditCard size={16} />
                            <span>
                              <strong>Deposit:</strong>{" "}
                              {booking.payment.deposit_paid
                                ? "Paid"
                                : "Not Paid"}
                            </span>
                          </div>
                        </div>
                      )}

                      {booking.additional_notes && (
                        <div className={styles.notesSection}>
                          <div className={styles.detailItem}>
                            <AlertCircle size={16} />
                            <span>
                              <strong>Notes:</strong> {booking.additional_notes}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className={styles.clientDetails}>
                        <h5>Client Information</h5>

                        <div className={styles.detailItem}>
                          <span>
                            <strong>Email:</strong> {booking.client.email}
                          </span>
                        </div>

                        <div className={styles.detailItem}>
                          <span>
                            <strong>Phone:</strong> {booking.client.phone}
                          </span>
                        </div>

                        <div className={styles.detailItem}>
                          <span>
                            <strong>ID:</strong> {booking.client.nic}
                          </span>
                        </div>

                        {booking.client.address && (
                          <div className={styles.detailItem}>
                            <span>
                              <strong>Address:</strong> {booking.client.address}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

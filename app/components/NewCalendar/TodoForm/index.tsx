"use client";

import type React from "react";

import { useState } from "react";
import styles from "./index.module.css";

interface TodoFormProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export default function TodoForm({ onSubmit, onCancel }: TodoFormProps) {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText.trim()) {
      onSubmit(todoText);
      setTodoText("");
    }
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter todo text..."
        className={styles.todoInput}
        autoFocus
      />
      <div className={styles.formButtons}>
        <button type="submit" className={styles.submitButton}>
          Add Todo
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

import React from "react";
import styles from "../styles/taskCard.module.css";

export default function CompletedTaskCard({ task }) {
  return (
    <div className={styles.card}>
      <p>{task.title}</p>
      <button>delete</button>
    </div>
  );
}

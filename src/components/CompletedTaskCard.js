import React from "react";
import styles from "../styles/taskCard.module.css";

export default function CompletedTaskCard({
  task,
  setCompletedTasks,
  setUncompletedTasks,
  completedTasks,
  uncompletedTasks,
}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/tasks/${e.target.value}`, {
      method: "DELETE",
    });
    let newCompletedTasks = completedTasks.filter((_task) => {
      return _task._id !== e.target.value;
    });
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className={styles.card}>
      <p>{task.title}</p>
      <button onClick={handleDelete} value={task._id}>
        delete
      </button>
    </div>
  );
}

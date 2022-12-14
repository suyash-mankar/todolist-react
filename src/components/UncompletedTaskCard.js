import React from "react";
import styles from "../styles/tasksCard.module.css";
import { useState, useEffect } from "react";

export default function UncompletedTaskCard({
  task,
  setCompletedTasks,
  setUncompletedTasks,
  completedTasks,
  uncompletedTasks,
}) {
  const handleDone = async (taskId) => {
    let response = await fetch(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    response = await response.json();

    setCompletedTasks([response.task, ...completedTasks]);
    let newUncompletedTasks = uncompletedTasks.filter((task) => {
      return task._id !== taskId;
    });
    setUncompletedTasks(newUncompletedTasks);
  };

  const handleDelete = async (taskId) => {
    const res = await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });
    let newUncompletedTasks = uncompletedTasks.filter((_task) => {
      return _task._id !== taskId;
    });
    setUncompletedTasks(newUncompletedTasks);
  };

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="trash"
          onClick={() => handleDone(task._id)}
          className={styles.doneImg}
        />
        <p>{task.title}</p>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png"
        alt="trash"
        onClick={() => handleDelete(task._id)}
        className={styles.deleteImg}
      />
    </div>
  );
}

import React from "react";
import styles from "../styles/taskCard.module.css";
import { useState, useEffect } from "react";

export default function UncompletedTaskCard({
  task,
  setCompletedTasks,
  setUncompletedTasks,
  completedTasks,
  uncompletedTasks,
}) {
  const handleDone = async (e) => {
    e.preventDefault();
    let response = await fetch(`/tasks/${e.target.value}`, {
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
      return task._id !== e.target.value;
    });
    setUncompletedTasks(newUncompletedTasks);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles.card}>
      <p>{task.title}</p>
      <button onClick={handleDone} value={task._id}>
        done
      </button>
      <button onClick={handleDelete} value={task._id}>
        delete
      </button>
    </div>
  );
}

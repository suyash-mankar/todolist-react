import React from "react";
import styles from "../styles/tasksCard.module.css";

export default function UncompletedTaskCard({
  task,
  setCompletedTasks,
  setUncompletedTasks,
  completedTasks,
  uncompletedTasks,
}) {

  // Update the completed field of task in database by making a PUT request
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

    // Update the tasks in the frontend without refreshing
    setCompletedTasks([response.task, ...completedTasks]);
    let newUncompletedTasks = uncompletedTasks.filter((task) => {
      return task._id !== taskId;
    });
    setUncompletedTasks(newUncompletedTasks);
  };

  // Delete the task in the database by making a DELETE request
  const handleDelete = async (taskId) => {
    const res = await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });

    // remove the task from the frontend without refreshing
    let newUncompletedTasks = uncompletedTasks.filter((_task) => {
      return _task._id !== taskId;
    });
    setUncompletedTasks(newUncompletedTasks);
  };

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "center" }}>
      {/* acts as done btn */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="trash"
          onClick={() => handleDone(task._id)}
          className={styles.doneImg}
        />
        <p>{task.title}</p>
      </div>
      {/* acts as delete btn */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png"
        alt="trash"
        onClick={() => handleDelete(task._id)}
        className={styles.deleteImg}
      />
    </div>
  );
}

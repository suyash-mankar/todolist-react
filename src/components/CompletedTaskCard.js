import React from "react";
import styles from "../styles/tasksCard.module.css";

export default function CompletedTaskCard({
  task,
  setCompletedTasks,
  setUncompletedTasks,
  completedTasks,
  uncompletedTasks,
}) {
  // Delete the task in the database by making a DELETE request
  const handleDelete = async (taskId) => {
    const res = await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });

    // remove the task from the frontend without refreshing
    let newCompletedTasks = completedTasks.filter((_task) => {
      return _task._id !== taskId;
    });
    setCompletedTasks(newCompletedTasks);
  };

  // Update the completed field of task in database by making a PUT request
  const handleModify = async (taskId) => {
    let response = await fetch(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    response = await response.json();

    // Update the tasks in the frontend without refreshing
    setUncompletedTasks([response.task, ...uncompletedTasks]);
    let newCompletedTasks = completedTasks.filter((task) => {
      return task._id !== taskId;
    });
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* acts as undo btn */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4154/4154432.png"
          alt="undo"
          onClick={() => handleModify(task._id)}
          className={styles.undoImg}
        />
        <p
          style={{ textDecoration: "line-through", color: "rgb(44, 191, 46)" }}
        >
          {task.title}
        </p>
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

import { useState, useEffect } from "react";
import CompletedTaskCard from "./CompletedTaskCard";
import UncompletedTaskCard from "./UncompletedTaskCard";
import styles from "../styles/app.module.css";

function App() {
  const [data, setData] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const getData = async () => {
      let response = await fetch("/tasks");
      response = await response.json();
      let tasks = response.tasks;

      function compare(task1, task2) {
        if (task1.updatedAt < task2.updatedAt) {
          return 1;
        }
        if (task1.updatedAt > task2.updatedAt) {
          return -1;
        }
        return 0;
      }

      tasks.sort(compare);
      setData(tasks);

      let completedTasksData = tasks.filter((task) => {
        return task.completed;
      });
      completedTasksData.sort(compare);
      setCompletedTasks(completedTasksData);

      let uncompletedTasksData = tasks.filter((task) => {
        return !task.completed;
      });
      uncompletedTasksData.sort(compare);
      setUncompletedTasks(uncompletedTasksData);
    };
    getData();
  }, []);

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("/tasks/create", {
      method: "POST",
      body: JSON.stringify({
        title: taskTitle,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    response = await response.json();
    console.log(response);
    setUncompletedTasks([response.task, ...uncompletedTasks]);
  };

  return (
    <div>
      <div className={styles.outerContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <input type="submit" />
        </form>

        <div className={styles.tasksContainer}>
          <div className={styles.uncompletedTasks}>
            <h3>UNCOMPLETED TASKS</h3>
            {uncompletedTasks.map((task) => {
              return (
                <UncompletedTaskCard
                  task={task}
                  key={task._id}
                  completedTasks={completedTasks}
                  uncompletedTasks={uncompletedTasks}
                  setCompletedTasks={setCompletedTasks}
                  setUncompletedTasks={setUncompletedTasks}
                />
              );
            })}
          </div>

          <div className={styles.completedTasks}>
            <h3>COMPLETED TASKS</h3>
            {completedTasks.map((task) => {
              return <CompletedTaskCard task={task} key={task._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import CompletedTaskCard from "./CompletedTaskCard";
import UncompletedTaskCard from "./UncompletedTaskCard";
import styles from "../styles/app.module.css";
import Button from "react-bootstrap/Button";

function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const getData = async () => {
      // fetch the data from database
      let response = await fetch("/tasks");
      response = await response.json();
      let tasks = response.tasks;

      // compare fnc to sort the tasks a/c to updatedAt date
      function compare(task1, task2) {
        if (task1.updatedAt < task2.updatedAt) {
          return 1;
        }
        if (task1.updatedAt > task2.updatedAt) {
          return -1;
        }
        return 0;
      }
      // sort the tasks a/c to updatedAt date
      tasks.sort(compare);

      // seperate the completed tasks and update the completedTasks state
      let completedTasksData = tasks.filter((task) => {
        return task.completed;
      });
      completedTasksData.sort(compare);
      setCompletedTasks(completedTasksData);

      // seperate the uncompleted tasks and update the uncompletedTasks state
      let uncompletedTasksData = tasks.filter((task) => {
        return !task.completed;
      });
      uncompletedTasksData.sort(compare);
      setUncompletedTasks(uncompletedTasksData);
    };
    getData();
  }, []);

  // fnc to handle creating of new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send a post request to create a new task with task title
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
    // add the newly created task in the uncompleted tasks state
    setUncompletedTasks([response.task, ...uncompletedTasks]);
  };

  return (
    <div>
      <div className={styles.outerContainer}>
        {/* form to create a new task */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter New Task"
          />
          <Button type="submit" variant="primary" className={styles.newTaskBtn}>
            Create New Task
          </Button>
        </form>

        <div className={styles.tasksContainer}>
          {/* uncompleted tasks section */}
          <div className={styles.uncompletedTasks}>
            <h3>Tasks To Do</h3>
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

          {/* completed tasks section */}
          <div className={styles.completedTasks}>
            <h3>Completed Tasks</h3>
            {completedTasks.map((task) => {
              return (
                <CompletedTaskCard
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
        </div>
      </div>
    </div>
  );
}

export default App;

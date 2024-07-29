import { useState } from "react";
import "./App.css";

interface Task {
  id: number;
  task: string;
  count: number;
  editToggle: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [task, setTask] = useState("");

  const [editTask, setEditTask] = useState("");

  function onTaskSubmit() {
    if (task === "") {
      return;
    }

    const newTask: Task = {
      id: Math.floor(100000 + Math.random() * 900000),
      task: task,
      count: 0,
      editToggle: false,
    };

    setTasks([...tasks, newTask]);
  }

  function onTaskDelete(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function onResetPersonCount() {
    const newTasks = tasks.map((task) => {
      return {
        ...task,
        count: 0,
      };
    });

    setTasks(newTasks);
  }

  function onTaskCountIncrement(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          count: task.count + 1,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function onTaskCountDecrement(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          count: task.count - 1,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function onTaskEdit(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        setEditTask(task.task);
        return {
          ...task,
          editToggle: !task.editToggle,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function onTaskEditSave(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          task: editTask,
          editToggle: !task.editToggle,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  return (
    <div>
      <nav>
        <h1>Task Manager</h1>
        <div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={onTaskSubmit}>Add Task</button>
        </div>
        <button onClick={onResetPersonCount}>Reset Person Count</button>
      </nav>

      <hr />

      <main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <button onClick={() => onTaskCountIncrement(task.id)}>+</button>
              <button onClick={() => onTaskCountDecrement(task.id)}>-</button>
              <div>{task.count === 0 ? "Person" : `${task.count} Persons`}</div>
              {task.editToggle ? (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <button onClick={() => onTaskEditSave(task.id)}>Save</button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>{task.task}</div>
                  <button onClick={() => onTaskEdit(task.id)}>Edit</button>
                </div>
              )}

              <button onClick={() => onTaskDelete(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

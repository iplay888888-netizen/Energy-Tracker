import { useEffect, useState } from "react";

export default function App() {
  const [energy, setEnergy] = useState(
    Number(localStorage.getItem("energy")) || 50
  );
  const [taskName, setTaskName] = useState("");
  const [taskEnergy, setTaskEnergy] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("energy", energy);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [energy, tasks]);

  function addTask() {
    if (!taskName || !taskEnergy) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        energy: Number(taskEnergy),
      },
    ]);
    setTaskName("");
    setTaskEnergy("");
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const doableTasks = tasks.filter((t) => t.energy <= energy);

  return (
    <div className="container">
      <h1>⚡ Energy Tracker</h1>

      <section>
        <h2>Current Energy: {energy}</h2>
        <input
          type="range"
          min="0"
          max="100"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
        />
      </section>

      <section>
        <h2>Add Task</h2>
        <input
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Energy cost"
          value={taskEnergy}
          onChange={(e) => setTaskEnergy(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </section>

      <section>
        <h2>✅ Can Do Now</h2>
        {doableTasks.length === 0 && <p>No tasks fit your energy.</p>}
        {doableTasks.map((task) => (
          <div className="task doable" key={task.id}>
            {task.name} ({task.energy})
            <button onClick={() => removeTask(task.id)}>✕</button>
          </div>
        ))}
      </section>

      <section>
        <h2>⏳ Save for Later</h2>
        {tasks
          .filter((t) => t.energy > energy)
          .map((task) => (
            <div className="task later" key={task.id}>
              {task.name} ({task.energy})
              <button onClick={() => removeTask(task.id)}>✕</button>
            </div>
          ))}
      </section>
    </div>
  );
}


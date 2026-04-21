import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./components/TaskItem.jsx";
import api from "./services/apiService.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("all");

  useEffect(() => {
    api.getTasks()
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("filtro");
    if (saved) setFiltro(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("filtro", filtro);
  }, [filtro]);

  const crearTarea = async () => {
  if (!texto.trim()) return;

    const nueva = await api.createTask(texto);
  setTasks([...tasks, nueva]);
  setTexto("");
}; 

  const eliminarTarea = async (id) => {
    await api.deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const toggleCompletada = async (task) => {
    const actualizada = await api.toggleTask(task);
    setTasks(tasks.map(t =>
      t._id === task._id ? actualizada : t
    ));
  };

  const tareasFiltradas = tasks.filter(task => {
    if (filtro === "active") return !task.completada;
    if (filtro === "completed") return task.completada;
    return true;
  });

  return (
    <div className="app">
      <h1>Todo App</h1>

      <p className="counter">{tasks.length} tareas</p>

      <div className="input-group">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && crearTarea()}
          placeholder="Add a new task..."
        />
        <button onClick={crearTarea}>+</button>
      </div>

      <div className="filters">
        <button
          className={filtro === "all" ? "active" : ""}
          onClick={() => setFiltro("all")}
        >
          All
        </button>

        <button
          className={filtro === "active" ? "active" : ""}
          onClick={() => setFiltro("active")}
        >
          Active
        </button>

        <button
          className={filtro === "completed" ? "active" : ""}
          onClick={() => setFiltro("completed")}
        >
          Completed
        </button>
      </div>

      <div className="task-list">
        <AnimatePresence>
          {tareasFiltradas.length === 0 ? (
            <p className="empty">No hay tareas</p>
          ) : (
            tareasFiltradas.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                eliminarTarea={eliminarTarea}
                toggleCompletada={toggleCompletada}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
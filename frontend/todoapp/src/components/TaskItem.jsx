function TaskItem({ task, eliminarTarea, toggleCompletada }) {
  return (
    <div
      className="task-item"
      style={{
        background: "#3a3a55",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {/* Texto de la tarea */}
      <span
        onClick={() => toggleCompletada(task)}
        style={{
          textDecoration: task.completada ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.texto}
      </span>

      {/* Botón eliminar */}
      <button onClick={() => eliminarTarea(task._id)}>X</button>
    </div>
  );
}

export default TaskItem;
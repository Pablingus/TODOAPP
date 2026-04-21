import mongoose from "mongoose";

// Estructura de la tarea
const taskSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  }
});

// Exportación correcta (DEFAULT)
const Task = mongoose.model("Task", taskSchema);
export default Task;
// Importar librerías
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";

// Activar variables de entorno
dotenv.config();

// Crear la aplicación
const app = express();

// Middleware
app.use(express.json()); // Permite recibir JSON
app.use(cors()); // Permite conexión con frontend

// Rutas
app.use("/tasks", taskRoutes);

// Ruta de prueba (para verificar que el servidor funciona)
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.log("Error DB:", err));

// Levantar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
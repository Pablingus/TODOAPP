import express from "express";
import Task from "../models/Task.js";

const router = express.Router();


// get para obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Task.find();
    res.json(tareas);
  } catch (error) {
    console.log("ERROR REAL:");
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// post para crear nueva tarea
router.post("/", async (req, res) => {
  try {
    const nueva = new Task({
      texto: req.body.texto //viene del frontend
    });

    await nueva.save(); //guarda en DB

    res.json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear tarea" });
  }
});


// put para actualizar tarea 
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Task.findByIdAndUpdate(
      req.params.id, //id de la tarea
      req.body,      //nuevos datos
      { new: true }  //devuelve la actualizada
    );

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
});


// delete para eliminar tarea
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

export default router;
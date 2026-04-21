const URL = "http://localhost:3000/tasks";

const getTasks = async () => {
  const res = await fetch(URL);
  return res.json();
};

const createTask = async (texto) => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ texto })
  });

  return res.json();
};

const deleteTask = async (id) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });
};

const toggleTask = async (task) => {
  const res = await fetch(`${URL}/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completada: !task.completada
    })
  });

  return res.json();
};

export default {
  getTasks,
  createTask,
  deleteTask,
  toggleTask
};
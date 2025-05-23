import { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false); // novo estado
  const [newTask, setNewTask] = useState(""); // novo estado

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleCreateTask = async (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      const newTodo = {
        userId: 1,
        id: Date.now(), // ID único
        title: newTask,
        completed: false,
      };

      // Envia para o endpoint
      await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      // Adiciona localmente
      setTodos((prev) => [newTodo, ...prev]);
      setNewTask("");
      setShowInput(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Carregando tarefas...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lista de Tarefas</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowInput(true)}
      >
        Criar tarefa
      </button>
      {showInput && (
        <input
          type="text"
          className="block w-full mb-4 p-2 border rounded"
          placeholder="Digite o título da tarefa e pressione Enter"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleCreateTask}
          autoFocus
        />
      )}
      <ul className="space-y-2">
        {todos.slice(0, 20).map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center p-2 rounded ${
              todo.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="mr-2"
            />
            <span className={todo.completed ? "line-through text-gray-500" : ""}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
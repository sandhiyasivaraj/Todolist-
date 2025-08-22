import { useEffect, useState } from "react";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todoList"));
    if (storedItems) {
      setTodoList(storedItems);
    }
  }, []);

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return alert("Task cannot be empty");
    const regx = /^[a-zA-Z0-9\s_-]+$/;
    if (!regx.test(newTodo))
      return alert("Only alphanumeric values, spaces, _ and - are allowed");
    const task = { id: Date.now(), name: newTodo, status: "pending" };
    const updatedList = [...todoList, task];
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    setNewTodo("");
  };

  const handleUpdate = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
    setNewTodo(todo.name);
  };

  const handleUpdateTask = () => {
    if (window.confirm("Are you sure you want to update this task?")) {
      const updatedList = todoList.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, name: newTodo } : todo
      );
      setTodoList(updatedList);
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      setIsEditing(false);
      setNewTodo("");
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedList);
      localStorage.setItem("todoList", JSON.stringify(updatedList));
    }
  };

  const handleCompletedTask = (id) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, status: "completed" } : todo
    );
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          name="newTask"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {isEditing ? (
          <button
            onClick={() => {
              handleUpdateTask();
            }}
          >
            Update Task
          </button>
        ) : (
          <button onClick={handleAddNewTask}>Add Task</button>
        )}
      </div>
      {todoList.length === 0 ? (
        <h3>No Tasks Yet</h3>
      ) : (
        <ul className="todoList">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className={`todoItem ${
                todo.status === "completed" ? "completed" : ""
              }`}
            >
              {todo.name}
              <div className="buttonGroup">
                {todo.status === "pending" && (
                  <>
                    <button onClick={() => handleCompletedTask(todo.id)}>
                      Mark as Completed
                    </button>

                    <button onClick={() => handleUpdate(todo)}>Update</button>
                    <button onClick={() => handleDeleteTask(todo.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

//task id
// task name
// task status
// task description

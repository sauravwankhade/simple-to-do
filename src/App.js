import { useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const newTask = { id: nextId, text, done: false };
    setTask([...task, newTask]);
    setNextId(nextId + 1);
    setText("");
  };

  const handleDelete = (id) => {
    setTask(task.filter((item) => item.id !== id));
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  const handleSaveEdit = (id) => {
    setTask(
      task.map((item) => (item.id === id ? { ...item, text: editText } : item))
    );
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul>
        {task.map((item) => (
          <li key={item.id}>
            {editTaskId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.text}
                <button onClick={() => handleEdit(item)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

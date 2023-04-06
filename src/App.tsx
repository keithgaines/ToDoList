import React, { useState, useEffect } from "react";
import Header from "./Header.tsx";
import "./Themes.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [todoList, setTodoList] = useState<TodoItem[]>(() => {
    const storedTodoList = localStorage.getItem("todoList");
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  });
  
  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  const onThemeChange = () => {
    handleThemeChange();
  };
  
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
  
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);
  }, [theme]);
  
  
  const [newTodoText, setNewTodoText] = useState("");
  

  const addTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
      };
      setTodoList([...todoList, newTodo]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const removeTodo = (id: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      <div className={`app ${theme}`}>
        <Header onThemeChange={onThemeChange} theme={theme} />
        <input
          type="text"
          value={newTodoText}
          placeholder="What do you need to do?"
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className="listitem"
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.text}
                </span>
                <div className="removebutton">
                  <button onClick={() => removeTodo(todo.id)}>X</button>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div>
          <div className="footer">
            <p>Click the checkbox on the left to mark it complete. Hit the X on the right to remove it from list.</p>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default App;

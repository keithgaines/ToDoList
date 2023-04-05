import React, { useState, useEffect } from "react";
import Header from "./Header.tsx";
import './Themes.css'
import styled from 'styled-components';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };


  const onThemeChange = () => {
    handleThemeChange();
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);


  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    const storedTheme = localStorage.getItem("theme");

    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);



  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      };
      setTodoList([...todoList, newTodo]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const removeTodo = (id: number) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const [filter, setFilter] = useState('all');


  return (
    <div>
      <div className={`app ${theme}`}>
        <Header onThemeChange={onThemeChange} theme={theme} />
        <input
          type="text"
          value={newTodoText}
          placeholder='What do you need to do?'
          onChange={e => setNewTodoText(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <ul>
          {todoList.map(todo => (
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
                    textDecoration: todo.completed ? "line-through" : "none"
                  }}
                >
                  {todo.text}
                </span>
                <button onClick={() => removeTodo(todo.id)}>X</button>
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

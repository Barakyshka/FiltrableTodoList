import React, { useState, useEffect, useCallback, useMemo } from "react";
import Todo from "./Todo.jsx";
import "./Todolist.css";
import { generateTodos } from "../utils/generate-todos.js";
import useInputValue from "./hooks/use-input-value.js";
import useTodosToDisplay from "./hooks/use-TodosToDisplay";

const FilterableTodo = () => {
  const [todos, setTodos] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [showOnlyUndone, setShowOnlyUndone] = useState(false);
  const todosToDisplay = useTodosToDisplay(todos, showOnlyUndone, sortType);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTodos(generateTodos());
      setIsLoading(false);
    }, 2000);
  }, []);

  const getRandomString = () => Math.random().toString(36).substring(2);

  const isInputValid = () => {
    const trimmedName = name.trim();
    const hasWhitespace = /^\s|\s$/.test(name);
    return !!trimmedName && !hasWhitespace;
  };

  const [name, error, handleSetName, setName, setError] = useInputValue();

  const handleAddTodo = () => {
    if (!isInputValid()) {
      setError(true);
      return;
    }

    const createdDate = new Date().getTime();
    const todo = {
      id: Date.now() + getRandomString(),
      name,
      done: false,
      createdDate
    };
    setName("");
    setTodos([todo, ...todos]);
    setError(false);
  };

  const handleSetDone = useCallback(
    (done, id) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo))
      );
    },
    [todos]
  );

  const handleDel = useCallback(
    (idToDelete) => {
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== idToDelete)
      );
    },
    [todos]
  );

  const doneCount = useMemo(() => {
    return todos.filter((todo) => todo.done).length;
  }, [todos]);

  const unDoneCount = useMemo(() => {
    return todos.length - doneCount;
  }, [todos]);

  const addClass = error ? "red-button" : "valid-button";

  if (isLoading) {
    return <div> Loading... </div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1> FILTERABLE TODO LIST</h1>
        <div className="counters">
          <div className="count">All: {todos.length}</div>
          <div className="count">Done: {doneCount}</div>
          <div className="count">Left: {unDoneCount}</div>
        </div>
      </div>
      <div className="input-container">
        <input value={name} onChange={handleSetName} />
        <button
          onClick={handleAddTodo}
          className={`add-button ${addClass}`}
          disabled={error}
        >
          Добавить
        </button>
      </div>

      <div className="sort-buttons">
        <button
          onClick={() => setSortType("newest")}
          className={`sort-button ${sortType === "newest" ? "active-btn" : ""}`}
        >
          Сначала новые
        </button>
        <button
          onClick={() => setSortType("oldest")}
          className={`sort-button ${sortType === "oldest" ? "active-btn" : ""}`}
        >
          Сначала старые
        </button>
        <button
          onClick={() => setSortType("alphabetical")}
          className={`sort-button ${
            sortType === "alphabetical" ? "active-btn" : ""
          }`}
        >
          В алфавитном порядке
        </button>
      </div>

      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={showOnlyUndone}
            onChange={() => setShowOnlyUndone(!showOnlyUndone)}
          />{" "}
          ФИЛЬТР: Только невыполненные
        </label>
      </div>

      <div className="task-list">
        {todosToDisplay.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDone={handleSetDone}
            onDelete={handleDel}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterableTodo;

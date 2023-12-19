import { useMemo } from "react";

const useTodosToDisplay = (todos, showOnlyUndone, sortType) => {
  return useMemo(() => {
    let filteredTodos = todos;
    if (showOnlyUndone) {
      filteredTodos = filteredTodos.filter((todo) => !todo.done);
    }

    switch (sortType) {
      case "newest":
        return [...filteredTodos].sort((a, b) => b.createdDate - a.createdDate);
      case "oldest":
        return [...filteredTodos].sort((a, b) => a.createdDate - b.createdDate);
      case "alphabetical":
        return [...filteredTodos].sort((a, b) =>
          a.name.localeCompare(b.name, "en")
        );
    }
  }, [todos, showOnlyUndone, sortType]);
};

export default useTodosToDisplay;

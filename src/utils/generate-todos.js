export const generateTodos = (n = 10) => {
  const todos = [];
  for (let i = 0; i < n; i++) {
    todos.push(generateTodo());
  }

  return todos;
};

const generateTodo = () => ({
  id: Date.now() + getRandomString(),
  done: Math.random() > 0.5,
  name: getRandomString(),
  createdDate: new Date()
});

const getRandomString = () => Math.random().toString(36).substring(2);

import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [state, setState] = useState({
    todos: [],
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]); // si se actualiza el estado todo se graba la lista en local storage

  // Vendría a emular un componentDidUpdate
  useEffect(() => {
    setState({ todos: JSON.parse(localStorage.getItem("todos")) });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setState({ todos: newTodos });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setState((prev) => {
      return {
        todos: prev.todos.map((item) => (item.id === todoId ? newValue : item)),
      };
    });
  };

  const removeTodo = (id) => {
    setState({
        todos: [...state.todos].filter((todo) => todo.id !== id)// destructuring list assignacion de izq a derecha.
    });
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });
    setState({
        todos: updatedTodos
    });
  };

  return (
    <div>
      <h1>Day Planning</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        updateTodo={updateTodo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default TodoList;

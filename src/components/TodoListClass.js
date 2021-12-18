import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

class TodoListClass extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
    this.addTodo = this.addTodo.bind(this); 
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentDidMount() {
    this.setState({ todos: JSON.parse(localStorage.getItem("todos")) });
  }

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  addTodo(todo) {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...this.state.todos];
    this.setState(() => {
      return {
        todos: newTodos,
      };
    });
  }

  updateTodo(todoId, newValue) {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    this.setState((prev) => {
      return {
       todos: prev.todos.map((item) => (item.id === todoId ? newValue : item)),
     };
    });
  }
  

  removeTodo(id) {
    this.setState({
      todos: [...this.state.todos].filter((item) => item.id !== id),
    });
  }

  completeTodo(id) {
    let updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos,
    });
  }

  render() {
    return (
      <div>
        <h1>Day Planning</h1>
        <TodoForm onSubmit={this.addTodo} />
        <Todo
          todos={this.state.todos}
          updateTodo={this.updateTodo}
          completeTodo={this.completeTodo}
          removeTodo={this.removeTodo} 
        />
      </div>
    );
  }
}

export default TodoListClass;

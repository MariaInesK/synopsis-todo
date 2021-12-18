// traer módulos de A a B (dependencias)
import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

// SYNTACTIC SUGAR! -> Se ven de una forma pero se comportan de otra

// Para pasar de función a clase:

// 1.- Crear la clase y extender React.Component
// 2.- Llamar a super (para heredar la interface de la clase React.Component)
// 3.- Crear estado inicial (esto solo tiene sentido en componentes statefull)
// 4.- useEffect, si se aplica, mirar si es un componentDidMount/componentDidUpdate/componentWillUnmount
// 5.- Definir los handles, recuerda pasar del hook useState a this.setState
// 6.- Cada vez que haya una referencia al estado hacerlo a través del this !important
// 7.- Hacer el binding de los métodos a la clase. (Para forzar su contexto de ejecución a la clase!!!) !important
// 8.- Si no hiciste el 7, no va a servir!!

class TodoListClass extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
    this.addTodo = this.addTodo.bind(this); // BINDING!!
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
          removeTodo={this.removeTodo} //this= 
        />
      </div>
    );
  }
}

export default TodoListClass;

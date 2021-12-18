import "./App.css";
import TodoList from './components/TodoListFunct';
//import TodoList from './components/TodoList';
//import TodoList from "./components/TodoListClass";

import Header from "./components/Header";

function App() {
  return (
    <div className="todo-app">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;

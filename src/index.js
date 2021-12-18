import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

class Perro {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log(this);
    console.log(`Doggy ${this.name} is barking`);
  }
}

const tommy = new Perro("tommy");

const bark = tommy.bark;
bark.apply(tommy);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

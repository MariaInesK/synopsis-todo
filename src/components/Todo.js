import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEditCircleFill } from "react-icons/ri";
/*mui*/
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>

      <div className="icons">
        <RiDeleteBin5Fill
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <RiEditCircleFill
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
        <FormGroup>
          <FormControlLabel
            className="check"
            control={
              <Checkbox
                icon={
                  <CheckCircleOutlineIcon
                    style={{ fill: "rgba(249, 242, 246, 0.36)" }}
                  />
                }
                checkedIcon={<CheckCircleIcon style={{ fill: "#7FFF00" }} />}
                name="checkedH"
              />
            }
            label="Done"
          />
        </FormGroup>

        <span className="date">
          <p> {`${new Date().toLocaleString()}`}</p>
        </span>
      </div>
    </div>
  ));
}

export default Todo;

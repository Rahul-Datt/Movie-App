import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../redux/features/todo/todoSlice";

const Todo = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const {todo} = useSelector((state) => state.todos)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(data))
  }

  const handleDelete = (id) => {
    dispatch(removeTodo(id))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button>Add Todo</button>
      </form>
      {
        data.length > 0 &&
        <ul>
            {
                todo.map((item,id) => {
                    return (
                        <div key={id}>
                            <li>{item}</li>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                        </div>
                        
                    )
                })
            }
        </ul>
      }
    </>
  );
};

export default Todo;

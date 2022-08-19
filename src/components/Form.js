import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodosAsync } from '../redux/todos/todosSlice';



function Form() {

  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const newTodoIsLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const newTodoError = useSelector((state) => state.todos.addNewTodo.error);



  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!title) return ;

    await dispatch(addTodosAsync(title));
    setTitle("");

  }

//  if(newTodoError) {
//   alert(newTodoError);
//   return;
//  }

  return (
    <form style = {{display: "flex", alignItems : "center"}} onSubmit = {handleSubmit}>
        <input 
        disabled={newTodoIsLoading}
        className="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}/>

        {newTodoIsLoading && <span>Loading...</span> } 
        {newTodoError && <span> {newTodoError} </span>}
    </form>
  )
}

export default Form
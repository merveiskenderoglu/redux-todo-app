import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, clearCompleted } from "../redux/todos/todosSlice" 



function ContentFooter() {

	const currentFilter = useSelector(state => state.todos.currentFilter);
	const dispatch = useDispatch();

	const items = useSelector (state => state.todos.items);
	const filtered = items.filter(item => item.completed === false);
	

  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{filtered.length}</strong> {" "}
			item{filtered.length > 1 ? "s" : ""} left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className={currentFilter === "all" ? "selected" : ""} onClick = {() => dispatch(changeFilter("all"))}>All</a>
			</li>
			<li>
				<a href="#/" className={currentFilter === "active" ? "selected" : ""} onClick = {() => dispatch(changeFilter("active"))}>Active</a>
			</li>
			<li>
				<a href="#/" className={currentFilter === "completed" ? "selected" : ""} onClick = {() => dispatch(changeFilter("completed"))}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick = {() => dispatch(clearCompleted())}>
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter
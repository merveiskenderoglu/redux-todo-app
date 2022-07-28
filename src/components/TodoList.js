import React from 'react';
import { useSelector } from 'react-redux';
import { toggle, destroy } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';



function TodoList() {

	const items = useSelector((state) => state.todos.items);
	const dispatch = useDispatch();
	const handleDestroy = (id) => {
		if (window.confirm("are you sure?")) {
			dispatch(destroy(id))
		}		
	}

	const currentFilter = useSelector(state => state.todos.currentFilter);

	let filtered = [...items];

	if(currentFilter !== "all") {
		filtered = items.filter(item => currentFilter === "active" ? item.completed === false : item.completed === true);
	}

	return (
		<ul className="todo-list">
		
			{
				filtered.map((item) => (
					<li key={item.id} className={item.completed ? "completed" : ""}>
						<div className="view">
							<input className="toggle" type="checkbox" checked={item.completed} onChange = {() => dispatch(toggle(item.id))}/>
							<label>{item.title}</label>
							<button className="destroy" onClick = {() => handleDestroy(item.id)}></button>
						</div>						
					</li>
				))
			}


		</ul>
	)
}

export default TodoList;
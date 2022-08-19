import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { toggle, destroy, selectFilteredTodos, getTodosAsync } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';




function TodoList() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.todos.isLoading);
	const error = useSelector((state) => state.todos.error);

	useEffect(() => {
		dispatch(getTodosAsync());
	},[dispatch])

	// const items = useSelector((state) => state.todos.items);
	
	const handleDestroy = (id) => {
		if (window.confirm("are you sure?")) {
			dispatch(destroy(id))
		}		
	}

	const filtered = useSelector(selectFilteredTodos);
	// const currentFilter = useSelector(state => state.todos.currentFilter);

	// let filtered = [...items];

	// if(currentFilter !== "all") {
	// 	filtered = items.filter(item => currentFilter === "active" ? item.completed === false : item.completed === true);
	// }

	if(isLoading) {
		return <div> Loading ...</div>
	}

	if(error) {
		return <div>{error}</div>
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
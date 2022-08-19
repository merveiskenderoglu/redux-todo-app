import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios('https://jsonplaceholder.typicode.com/todos');
    return res.data ;
})

export const addTodosAsync = createAsyncThunk('todos/addTodosAsync', async (data) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos',{id : nanoid(), title:data , completed:false});
    return res.data;
})


export const todosSlice = createSlice({
    name : "todos",
    initialState : {
        items : [],
        currentFilter : "all",
        isLoading : false,
        error :   null,
        // newTodoIsLoading : false,
        // newTodoError : null,
        addNewTodo : {
            isLoading : false,
            error : null,
        }
    },
    reducers : {
        // addTodo : (state,action) => {
        //     state.items = [action.payload, ...state.items];
        // },

        // addTodo : {
        //     reducer : (state,action) => {
        //     state.items = [action.payload, ...state.items];
        //     },
        //     prepare : ({title}) => {
        //         return {
        //             payload : {
        //                 id : nanoid(),
        //                 completed : false,
        //                 title
        //             },
        //         }
        //     },
        // },
        toggle : (state,action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed = !item.completed
        },
        destroy : (state,action) => {
            const id = action.payload;
            const filtered = state.items.filter(item => item.id !== id);
            state.items = filtered
        },
        changeFilter : (state,action) => {
            state.currentFilter = action.payload;                
        },
        clearCompleted : (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        },
        
    },
    extraReducers : {
        // get todos
        [getTodosAsync.pending] : (state,action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled] : (state,action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add todo
        [addTodosAsync.pending] : (state,action) => {
            state.addNewTodo.isLoading = true;
        },
        [addTodosAsync.fulfilled] : (state,action) => {
            state.items = [action.payload, ...state.items];
            state.addNewTodo.isLoading = false;
        },
        [addTodosAsync.rejected] : (state,action) => {
            state.addNewTodo.isLoading = false;
            state.addNewTodo.error = action.error.message;
        }
    },
})

export default todosSlice.reducer;
export const { toggle, destroy, changeFilter, clearCompleted } = todosSlice.actions;


// Selectors instance 1
/* export const SelectTodos = (state) => state.todos.items; */
// in TodoList
// const items = useSelector((state) => state.todos.items);
// const items = useSelector(SelectTodos);



// Selectors instance 2
export const selectFilteredTodos = (state) => {
    if(state.todos.currentFilter === "all") {
        console.log(state.todos.items);
        return state.todos.items
    }

    return state.todos.items.filter((todo) => {
        return state.todos.currentFilter === "active" ? todo.completed === false : todo.completed === true ;
    })
}



// in TodoList

// const currentFilter = useSelector(state => state.todos.currentFilter);
// let filtered = [...items];
// if(currentFilter !== "all") {
//     filtered = items.filter(item => currentFilter === "active" ? item.completed === false : item.completed === true);
// }
import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name : "todos",
    initialState : {
        items : [
            {
                id : "1",
                title : "Learn React",
                completed : true
            },
            {
                id : "2",
                title : "Learn Java",
                completed : false
            }
        ],
        currentFilter : "completed",
    },
    reducers : {
        addTodo : (state,action) => {
            state.items = [action.payload, ...state.items];
        },
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
            }
        
    }
})

export default todosSlice.reducer;
export const {addTodo, toggle, destroy, changeFilter} = todosSlice.actions;




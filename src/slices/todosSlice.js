import { createSlice } from "@reduxjs/toolkit";
import { initialTodos, tags } from "../data/initialState.js";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: initialTodos,
        resetTodos: null,
        tags,
        selectedTag: "",
        isHide: false,
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                ...action.payload,
                id: state.todos.length + 1,
                done: false,
                date: new Date().toISOString(),
            };
            state.todos.push(newTodo);
            if (!state.resetTodos) {
                state.resetTodos = state.todos;
            }
            state.resetTodos.push(newTodo);
        },
        updateTodo: (state, action) => {
            const updateIdx = state.todos.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (updateIdx > -1) {
                state.todos.splice(updateIdx, 1, action.payload);
            }
        },
        deleteTodo: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter((todo) => todo.id !== id);
        },
        tagHandler: (state, action) => {
            const label = action.payload;
            state.selectedTag = label;
        },
        tagFilterHandler: (state) => {
            state.todos = state.resetTodos.filter(
                (el) => el.tag === state.selectedTag
            );
        },
        isHideHandler: (state) => {
            state.isHide = false;
        },
        doneFilterHandler: (state) => {
            state.isHide = !state.isHide;
            if (state.isHide) {
                state.todos = state.todos.filter((el) => el.done === false);
            } else {
                state.todos = state.selectedTag
                    ? state.resetTodos.filter(
                          (el) => el.tag === state.selectedTag
                      )
                    : state.resetTodos;
            }
        },
        resetHandler: (state) => {
            state.todos = state.resetTodos;
            state.selectedTag = "";
        },
    },
});
export const {
    addTodo,
    updateTodo,
    deleteTodo,
    tagHandler,
    resetHandler,
    tagFilterHandler,
    doneFilterHandler,
    isHideHandler,
} = todosSlice.actions;

export default todosSlice;

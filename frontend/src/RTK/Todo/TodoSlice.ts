import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


import type { Todo, TodoEditPayload, TodoAddPayload } from "../../type/todo";
import { todoApi } from "./TodoQuery";





const initialTodos: { todos: Todo[] } = {
    todos: [
        {
            userId: 0,
            id: 0,
            title: 'Тест туду',
            description: 'Описание',
            completed: false,
            date: '20.01.2026'
        },
        {
            userId: 1,
            id: 1,
            title: 'Тест туду number 2',
            description: 'description number 2',
            completed: false,
            date: '20.01.2026'
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState: initialTodos,
    reducers: {
        toggleTodo(state, action: PayloadAction<number>) {
            const todo = state.todos.find((t) => t.id == action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        addTodo(state, action: PayloadAction<TodoAddPayload>) {
            const formatted = new Intl.DateTimeFormat("ru-RU").format(new Date());
            state.todos.push({
                userId: 0,
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                date: formatted
            })
        },
        deletTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter((t) => t.id !== action.payload)
        },
        updateTodo(state, action: PayloadAction<TodoEditPayload>) {
            const todo = state.todos.find(t => t.id === action.payload.id)
            if (todo) {
                if (action.payload.description !== undefined) {
                    todo.description = action.payload.description;
                }
                if (action.payload.title !== undefined) {
                    todo.title = action.payload.title
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            todoApi.endpoints.getTodos.matchFulfilled,
            (state, action) => {
                action.payload.map((t) => state.todos.push({ ...t, description: '' }))
            }
        );
    },
})

export const { toggleTodo, addTodo, deletTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer




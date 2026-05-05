import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Todo } from '../../type/todo'

export const todoApi = createApi({
    reducerPath: 'todoApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),

    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => 'todos'
        })
    })
})


export const {
    useGetTodosQuery,
} = todoApi 
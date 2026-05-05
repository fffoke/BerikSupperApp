import { useEffect, useState } from "react"
import { useAppSelector } from "../../RTK/store"
import type { Todo } from "../../type/todo"

export const useFindTodo = (id: number, toggle: () => void) => {

    const todos = useAppSelector((s) => s.todos.todos)
    const [todo, setTodo] = useState<Todo>()
    useEffect(() => {

        const res = todos.find((p) => p.id === id)
        setTodo(res)

    }, [id, toggle])
    // console.log(id)
    return todo
}
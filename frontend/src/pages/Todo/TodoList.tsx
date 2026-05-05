import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../RTK/store"
import { toggleTodo, deletTodo } from "../../RTK/Todo/TodoSlice"
import TodoListEl from "../../components/Elements/Todo/TodoListEl"
import TodoEl from "../../components/Elements/Todo/TodoEl"

export default function TodoList() {

    const [adding, setAdding] = useState(false)

    const [todoId, setTodoId] = useState<number>(0)
    const dispatch = useAppDispatch()
    const todos = useAppSelector((t) => t.todos.todos)

    const toggle = (id: number) => {
        dispatch(toggleTodo(id))
    }

    const del = (id: number) => {
        dispatch(deletTodo(id))
    }


    const onClose = () => {
        setAdding(!adding)
    }

    return (
        <>
            <div className="flex min-h-screen">

                {/* SIDEBAR */}
                <aside className="w-70 border-r border-gray-200 p-4
                        bg-gray-50
                        dark:bg-gray-900 dark:border-gray-700">

                    <TodoListEl todos={todos} adding={adding} setAdding={onClose} toggle={toggle} del={del} setTodoId={setTodoId} todoId={todoId} />
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
                    <div className="text-gray-500 dark:text-gray-400">
                        <TodoEl id={todoId} />
                    </div>
                </main>

            </div>
        </>
    )
}
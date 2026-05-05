import { useAppDispatch } from "../../../RTK/store";
import type { Todo, TodoAddPayload } from "../../../type/todo";
import ModalWindow from "../../UI/ModalWindow";
import { useState } from "react";
import React from "react";
import { addTodo } from "../../../RTK/Todo/TodoSlice";
import type { InputFields } from "../../../type/inputfields";

type Props = {
    todos: Todo[],
    toggle: (id: number) => void,
    del: (id: number) => void,
    adding: boolean,
    setAdding: () => void
    setTodoId: React.Dispatch<React.SetStateAction<number>>
    todoId: number
}




export default function TodoListEl({ todos, toggle, del, adding, setAdding, setTodoId, todoId }: Props) {

    const [form, setForm] = useState<TodoAddPayload>({
        title: '',
        description: '',
    })

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const filteredTodos = todos
        .filter((t) => {
            if (filter === "active") return !t.completed;
            if (filter === "completed") return t.completed;
            return true;
        })
        .filter((t) =>
            t.title.toLowerCase().includes(search.toLowerCase())
        );

    const dispatch = useAppDispatch()
    const InputFields: InputFields[] = [
        {
            label: "Название",
            name: "title",
            value: form.title,
            onChange: (e) => setForm(f => ({ ...f, title: e.target.value }))
        },
        {
            label: "Описание",
            name: "description",
            value: form.description,
            onChange: (e) => setForm(f => ({ ...f, description: e.target.value }))
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(addTodo(form))

        setAdding()
        setForm({
            title: '',
            description: '',
        })
    }
    return (
        <>
            <div className="w-full max-w-md mx-auto" >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400">
                        Список задач
                    </div>

                    <button
                        onClick={() => setAdding()}
                        className="
            text-xs px-2 py-1 rounded-lg
            text-gray-500 hover:text-gray-800 hover:bg-gray-100
            dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700
            transition
          "
                    >
                        + добавить
                    </button>
                </div>

                {/*  МОДАЛКА ВЕРНУЛАСЬ */}
                <ModalWindow
                    isOpen={adding}
                    onClose={() => setAdding()}
                    header="Заполни форму"
                    body={{
                        InputFields: InputFields,
                        handleSubmit: handleSubmit,
                        button_text: "Создать",
                    }}
                />

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`
                    
                    w-full mb-3 px-3 py-2 text-sm rounded-lg border
                    bg-gray-50 border-gray-300 text-gray-900
                    focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white

                    `}
                />

                <div className="flex gap-2 mb-3">
                    {["all", "active", "completed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`
              px-3 py-1.5 text-xs rounded-lg border transition
              ${filter === f
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                }
            `}
                        >
                            {f === "all" && "Все"}
                            {f === "active" && "Активные"}
                            {f === "completed" && "Выполненные"}
                        </button>
                    ))}
                </div>

                {/* LIST */}
                <div>
                    {filteredTodos.length === 0 ? (
                        <div className="text-sm text-gray-400 dark:text-gray-500">
                            Ничего не найдено
                        </div>
                    ) : (
                        filteredTodos.map((t) => (
                            <div
                                key={t.id}
                                className={`
                flex items-start gap-3 py-3 px-1 border-b
                
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition group
                cursor-pointer
                ${t.id == todoId
                                        ? "bg-gray-200 dark:bg-gray-800"
                                        : "border-gray-200 dark:border-gray-700"
                                    }
              `}
                                onClick={() => setTodoId(t.id)}

                            >
                                {/* STATUS */}
                                <button
                                    onClick={() => toggle(t.id)}
                                    className={`
                  mt-1 px-2 py-0.5 text-xs rounded-md border transition
                  ${t.completed
                                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300"
                                            : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-400"
                                        }
                `}
                                >
                                    {t.completed ? "Выполнено" : "Активно"}
                                </button>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">
                                    <div
                                        className={`
                    text-sm font-medium break-words
                    ${t.completed
                                                ? "line-through text-gray-400 dark:text-gray-500"
                                                : "text-gray-900 dark:text-white"
                                            }
                  `}
                                    >
                                        {t.title}
                                    </div>

                                    {t.description && (
                                        <div
                                            className={`
                      text-xs mt-1 break-words
                      ${t.completed
                                                    ? "text-gray-400 dark:text-gray-500"
                                                    : "text-gray-500 dark:text-gray-400"
                                                }
                    `}
                                        >
                                            {t.description}
                                        </div>
                                    )}
                                </div>

                                {/* DELETE */}
                                <button
                                    onClick={() => del(t.id)}
                                    className="
                  text-gray-400 hover:text-red-500
                  opacity-0 group-hover:opacity-100
                  transition text-sm
                "
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div >

        </>
    )
}
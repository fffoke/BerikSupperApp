import { useAppDispatch } from "../../../RTK/store";
import { toggleTodo, updateTodo, deletTodo } from "../../../RTK/Todo/TodoSlice";
import { useFindTodo } from "../../../hooks/Todo/useFindTodo";
import { useEffect, useState } from "react";
import type { TodoEdit } from "../../../type/todo";

type Props = {
    id: number;
};



export default function TodoEl({ id }: Props) {
    const dispatch = useAppDispatch();

    const toggle = () => {
        if (todo) dispatch(toggleTodo(todo.id));
    };

    const todo = useFindTodo(id, toggle);

    const [editForm, setEditForm] = useState<TodoEdit>({
        description: '',
        title: ''
    })



    const [edit, setEdit] = useState<boolean>(false)

    useEffect(() => {
        if (todo) {
            setEditForm({
                title: todo.title,
                description: todo.description
            })
        }

        return setEdit(false)
    }, [todo])

    const editConform = () => {
        if (edit) {
            if (todo !== undefined) {
                dispatch(updateTodo({
                    title: editForm.title,
                    description: editForm.description,
                    id: todo.id
                }))
            }
            setEdit(false)
        } else {
            setEdit(true)
        }

    }

    if (!todo) {
        return (
            <div className="p-6 text-gray-500 dark:text-gray-400">
                Я не нашел твой туду
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col">

            {/* HEADER */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">

                    {edit ? (
                        <input
                            type="text"
                            value={editForm.title || ""}
                            onChange={(e) =>
                                setEditForm((p) => ({
                                    ...p,
                                    title: e.target.value,
                                }))
                            }
                            className={`
                                        w-full text-2xl font-bold
                                        px-2 py-1 rounded-md border
                                        bg-gray-50 border-gray-300 text-gray-900
                                        focus:ring-2 focus:ring-blue-500 focus:outline-none
                                        dark:bg-gray-700 dark:border-gray-600 dark:text-white
                                        `}
                        />
                    ) : (
                        <h1
                            className={`
                                        text-2xl font-bold
                                        ${todo.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-900 dark:text-white"}
                                    `}
                        >
                            {todo.title}
                        </h1>
                    )}

                    {/* STATUS BADGE */}
                    <span
                        className={`
                                    px-3 py-1 text-xs rounded-full
                                        ${todo.completed
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }
                                    `}
                    >
                        {todo.completed ? "Выполнено" : "Активно"}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 p-6 overflow-auto">

                {/* DESCRIPTION */}
                <div className="mb-6">
                    <div className="text-xs uppercase text-gray-400 mb-2">
                        Описание
                    </div>

                    {edit

                        ?
                        <input type="text" value={editForm.description || ''} onChange={(e) =>
                            setEditForm((p) => ({
                                ...p,
                                description: e.target.value,
                            }))
                        }
                            className="
                                w-full px-3 py-2 text-sm rounded-lg border
                                bg-gray-50 border-gray-300 text-gray-900
                                focus:ring-2 focus:ring-blue-500
                                dark:bg-gray-700 dark:border-gray-600 dark:text-white
                             "
                        />
                        :
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                            {todo.description || "Описание отсутствует"}
                        </p>
                    }
                </div>

                {/* FAKE EXTRA BLOCKS (заглушки под будущее) */}
                <div className="space-y-4">

                    <div>
                        <div className="text-xs text-gray-400 mb-1">Приоритет</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Низкий / Средний / Высокий (заглушка)
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-400 mb-1">Дата</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            {todo.date}
                        </div>
                    </div>

                </div>
            </div>

            {/* ACTIONS */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3">

                <button
                    onClick={() => {
                        if (todo) {
                            const confirmDelete = window.confirm("Удалить эту задачу?");
                            if (confirmDelete) {
                                dispatch(deletTodo(todo.id));
                            }
                        }
                    }}
                    className="
        px-4 py-2 rounded-lg text-sm font-medium
        bg-red-600 text-white hover:bg-red-700
        transition
        focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
    "
                >
                    Удалить
                </button>
                <button
                    onClick={toggle}
                    className="
            flex-1 px-4 py-2 rounded-lg text-sm font-medium
            bg-blue-600 text-white hover:bg-blue-700
            transition
          "
                >
                    {todo.completed
                        ? "Отметить как не сделано"
                        : "Отметить как сделано"}
                </button>

                <button
                    onClick={() => editConform()}
                    className={`
    px-4 py-2 rounded-lg text-sm font-medium
    transition flex items-center gap-2

    ${edit
                            ? `
          bg-green-600 text-white
          hover:bg-green-700
          focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        `
                            : `
          bg-gray-100 text-gray-700
          hover:bg-gray-200
          dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
        `
                        }
  `}
                >
                    {edit ? "Сохранить" : "Редактировать"}
                </button>

            </div>
        </div >
    );
}

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">

            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Todo App
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Учебный проект студента ШАГ
                    </p>
                </div>

                {/* Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 mb-5">
                    <p className="text-gray-700 dark:text-gray-200 text-center">
                        Это простой Todo List, созданный в рамках обучения.
                    </p>
                </div>

                {/* Info blocks */}
                <div className="grid gap-3">

                    <div className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-4">
                        <span className="text-gray-700 dark:text-gray-200">
                            📌 Добавление задач
                        </span>
                        <span className="text-sm text-green-500">done</span>
                    </div>

                    <div className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-4">
                        <span className="text-gray-700 dark:text-gray-200">
                            🗂 Хранение задач
                        </span>
                        <span className="text-sm text-green-500">done</span>
                    </div>

                    <div className="flex items-center justify-between bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg p-4">
                        <span className="text-gray-700 dark:text-gray-200">
                            ⚡ Redux Toolkit
                        </span>
                        <span className="text-sm text-blue-500">learning</span>
                    </div>

                </div>

                {/* Footer note */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    Сделано с ❤️ во время обучения React
                </div>

            </div>

        </div>
    )
}
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
    {
        id: 1,
        title: "Todo App",
        description: "Простой список задач",
        path: '/todo/'
    },
    {
        id: 2,
        title: "Chat App",
        description: "Реальный чат",
        path: '/'
    },
    {
        id: 3,
        title: "Delivery",
        description: "Доставка",
        path: '/food_delivery/'
    },
];

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col p-6 bg-gray-100 dark:bg-gray-900 transition-colors">

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                My Mini Apps
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 rounded-xl shadow border 
                                   bg-white border-gray-200
                                   dark:bg-gray-800 dark:border-gray-700
                                   transition-colors"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {project.title}
                        </h2>

                        <p className="mb-4 text-gray-500 dark:text-gray-300">
                            {project.description}
                        </p>

                        <Link
                            to={project.path}
                            className="px-4 py-2 rounded 
                                       bg-black text-white 
                                       dark:bg-white dark:text-black
                                       transition-colors"
                        >
                            Open
                        </Link>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
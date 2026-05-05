import { createBrowserRouter } from "react-router-dom";
import Loyalt from "../components/UI/Loyalt";
import Home from "../pages/Todo/Home";
import NotFoundPage from "../pages/NotFoundPage";
import TodoList from "../pages/Todo/TodoList";
import MainPage from "../pages/Main/MainPage";
import type { linkList } from "../type/linkList"
import ContactPage from "../pages/Main/ContactPage";

const linkList: linkList[] = [
    {
        image: ['https://img.icons8.com/?size=100&id=ACLAf31fuu2O&format=png&color=000000'],
        appName: 'todoApp',
        links: [
            {
                path: '/todo',
                pathText: 'Home'
            },
            {
                path: '/todo/todos',
                pathText: 'Todos'
            }
        ]
    },
    {
        image: ['/static/blacklogo.png', '/static/whitelogo.png'],
        appName: '',
        links: [
            // {
            //     path: '/todo',
            //     pathText: 'Home'
            // },
            // {
            //     path: '/todo/todos',
            //     pathText: 'Todos'
            // }
        ]
    },
]

export const router = createBrowserRouter([
    {
        path: '/todo',
        element: <Loyalt linkList={linkList[0]} />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: '*', element: <NotFoundPage />
            },
            {
                path: 'todos', element: <TodoList />
            }
        ]
    },
    {
        path: '/',
        element: <Loyalt linkList={linkList[1]} />,
        children: [
            {
                index: true, element: <MainPage />
            },
            {
                path: 'contact', element: <ContactPage />
            }
        ]
    }
])
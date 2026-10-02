import { createBrowserRouter } from "react-router-dom";
import Loyalt from "../components/UI/Loyalt";
import Home from "../pages/Todo/Home";
import NotFoundPage from "../pages/NotFoundPage";
import TodoList from "../pages/Todo/TodoList";
import MainPage from "../pages/Main/MainPage";
import { LinkLists } from "./linklist";
import ContactPage from "../pages/Main/ContactPage";
import Main from "../pages/Product_delivery/Main";
import CartPage from "../pages/Product_delivery/CartPage";
import RequireAuth from "./RequireAuth";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <Loyalt linkList={LinkLists[0]} />,
        children: [
            {
                index: true, element: <MainPage />
            },
            {
                path: 'contact', element: <ContactPage />
            }
        ]
    },
    {
        element: <RequireAuth />,
        children: [
            {
                path: '/todo',
                element: <Loyalt linkList={LinkLists[1]} />,
                children: [
                    { index: true, element: <Home /> },
                    { path: '*', element: <NotFoundPage /> },
                    { path: 'todos', element: <TodoList /> },
                ],
            },
            {
                path: '/food_delivery',
                element: <Loyalt linkList={LinkLists[2]} />,
                children: [
                    { index: true, element: <Main /> },
                    { path: 'cart', element: <CartPage /> },
                    { path: 'search', element: <Main /> },
                    { path: 'category/:slug', element: <Main /> },
                ],
            },
        ]
    },
])

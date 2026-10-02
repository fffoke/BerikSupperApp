import type { linkList } from "../type/linkList"

export const LinkLists: linkList[] = [
    {
        id: 'hub',
        appName: 'Приложения',
        homePath: '/',
        links: [
            { path: '/', pathText: 'Обзор' },
            { path: '/contact', pathText: 'Контакты' },
        ]
    },
    {
        id: 'todo',
        appName: 'Задачи',
        homePath: '/todo',
        links: [
            { path: '/todo', pathText: 'О проекте' },
            { path: '/todo/todos', pathText: 'Мои задачи' },
        ]
    },
    {
        id: 'food',
        appName: 'Магазин',
        homePath: '/food_delivery',
        links: [
            { path: '/food_delivery', pathText: 'Каталог' },
            { path: '/food_delivery/cart', pathText: 'Корзина' },
        ]
    }
]

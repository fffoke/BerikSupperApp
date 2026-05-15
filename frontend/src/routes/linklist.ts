import type { linkList } from "../type/linkList"

export const LinkLists: linkList[] = [
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
        image: ['/static/food_delivery.png'],
        appName: 'Food Delivery',
        links: [
            {
                path: '/food_delivery',
                pathText: 'Main'
            },
            {
                path: '',
                pathText: ''
            }
        ]
    }
]
# Проек BerikSupperApp

## Стек проекта

frontend - React, RTK, TS, reatc-router-dom
Backend - FastAPI, Pydantic, SQLAlcehmy

## Структура проект

```
├── backend # Отвечает за backend проекта
│   ├── alembic
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   ├── alembic.ini
│   ├── api
│   │   ├── routes
│   │   │   ├── auth
│   │   │   │   ├── jwt.py
│   │   │   │   └── password.py
│   │   │   ├── todo.py
│   │   │   └── user.py
│   │   └── schemes
│   │       ├── auth.py
│   │       ├── todo.py
│   │       └── user.py
│   ├── app
│   │   ├── config.py
│   │   ├── db
│   │   │   ├── base.py
│   │   │   ├── engine.py
│   │   │   ├── models
│   │   │   │   ├── todo_model.py
│   │   │   │   └── user_model.py
│   │   │   └── repositories
│   │   │       ├── base.py
│   │   │       ├── todo_repo.py
│   │   │       └── user_repo.py
│   │   └── services
│   │       └── user_service.py
│   └── requirements.txt # Все нужные библиотеки и её версий
└── frontend # Отвечает за frontend проекта
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── static # здесь зраниться всё нужна стастика
    │       ├── appLogo.png
    │       ├── blacklogo.png
    │       ├── logo.jpg
    │       └── whitelogo.png
    ├── src 
    │   ├── App.tsx
    │   ├── RTK # Папка которая отвечает за всё RTK логику
    │   │   ├── Todo # Slice и Qeury для Todo
    │   │   │   ├── TodoQuery.ts
    │   │   │   └── TodoSlice.ts
    │   │   └── store.ts # Иницализация нашего основого стора
    │   ├── components # Папка с компонентами
    │   │   ├── Elements # Папка с большими элементами
    │   │   │   └── Todo # Папка с большими элементами для Todo
    │   │   │       ├── TodoEl.tsx # Элемент для показа одного Todo 
    │   │   │       └── TodoListEl.tsx # Элемент для показа многих Todo
    │   │   └── UI # UI компоненты
    │   │       ├── Footer.tsx # Подвал сайта
    │   │       ├── Form.tsx # Компонент для формы
    │   │       ├── Header.tsx # Header (навигация)
    │   │       ├── Loyalt.tsx # Footer + Header
    │   │       ├── ModalWindow.tsx # Модальное окно
    │   │       └── TehemeChangeEl.tsx # Элемент для управления теммой
    │   ├── hooks # Кастомные хуки
    │   │   ├── Todo # Кастомные хуки для Todo
    │   │   │   └── useFindTodo.ts
    │   │   └── useTheme.ts # Кастомный хук для тем
    │   ├── index.css
    │   ├── main.tsx # Точка старта
    │   ├── pages # Папка с страничками
    │   │   ├── Main # Основные страницы
    │   │   │   ├── ContactPage.tsx # Страница Контактов
    │   │   │   └── MainPage.tsx # Основная страница
    │   │   └── Todo # Страницы для Todo
    │   │   |    ├── Home.tsx # Главная странца Todo
    │   │   |    └── TodoList.tsx #
    |   |    --- ── NotFoundPage.tsx # eror not Found
    │   ├── routes # Папка для роутов
    │   │   └── route.tsx # Создание всей маршутизаций
    │   └── type # папка для типов данных
    │       ├── inputfields.ts # типы для инпутов
    │       ├── linkList.ts #  типы для Header 
    │       └── todo.ts # типы для Todo
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```


## Суть проекта
создание большого веб-приложжения с мини аппи (приложениями)
для своего резюме


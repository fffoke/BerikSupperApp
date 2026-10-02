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

## Доступ к приложениям

- Главная страница и контакты открыты для гостей. Todo и магазин находятся внутри общего `RequireAuth` в `frontend/src/routes/route.tsx`. Новые приложения тоже нужно добавлять внутрь этого блока.
- Вход и регистрация используют почту и пароль. После регистрации пользователь сразу получает сессию; при входе в приложение сохранённая сессия проверяется через `/api/v1/auth/me`.
- Запросы к API идут через `frontend/src/RTK/authenticatedBaseQuery.ts`: он отправляет access token и обновляет его через refresh token. Каталог, товары, корзина и заказы требуют действующую сессию на сервере.
- Новые API, доступные только после входа, должны использовать `CurrentUser` из `backend/api/dependencies.py`. Для административных действий используйте `CurrentAdmin`.
- Старые пользователи без сохранённой почты не смогут войти новым способом, пока адрес не будет добавлен в их профиль.
- Todo пока хранит задачи в браузере, а не в профиле пользователя. Перед подключением нескольких реальных аккаунтов задачи нужно перенести в серверное хранилище или разделить по аккаунтам.

```
{
   "success": true,
   "errorCode": 0,
   "message": null,
   "result": [
      {
         "id": "a4c10b19-e15b-478d-a03a-54bf2caa2a1c",
         "resources": [
            {
               "resourceId": "25255",
               "specialityId": "23"
            }
         ],
         "serviceIds": [
            "11",
            "12"
         ],
         "visitTime": "2023-09-05T01:26:08+03:00",
         "duration": 10,
         "status": "available",
         "limit": 1,
         "allowedClientIds": ["dc9a0e94-4e39-4721-aa20-c39a742ca435"],
         "createdAt": "2023-09-05T01:26:08+03:00",
         "updatedAt": "2023-09-05T01:26:08+03:00",
         "appointment": {
            "id": "appointment123123",
            "patientIdType": "MPI",
            "patientId": "8569",
            "patientFullName": "Голиков Тихон Антонович",
         }
      },
      
   ]

import { configureStore } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { persistStore, persistReducer } from "redux-persist";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import todoSlice from "./Todo/TodoSlice";
import storage from "redux-persist/es/storage";
import AuthSlice from "./Auth/AuthSlice";
import CartSlice from "./Food_delivery/CartSlice";
import { AuthApi } from "./Auth/AuthQuery";
import { ProductApi } from "./Food_delivery/ProductQuery";
import { CartApi } from "./Food_delivery/CartQuery";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()


const persistConf = {
    todo: {
        key: 'todos',
        storage,
        whitelist: ["todos"]
    },
    auth: {
        key: 'auth',
        storage,
        whitelist: ["auth"]
    },
    cart: {
        key: 'cart',
        storage,
        whitelist: ["cart"]
    }
}

const TodoPersistreducer = persistReducer(persistConf.todo, todoSlice)
const AuthPersistreducer = persistReducer(persistConf.auth, AuthSlice)
const CartPersistreducer = persistReducer(persistConf.cart, CartSlice)

export const store = configureStore({
    reducer: {
        todos: TodoPersistreducer,
        auth: AuthPersistreducer,
        cart: CartPersistreducer,

        [AuthApi.reducerPath]: AuthApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer
    },

    middleware: () =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                ],
            },
        }).concat(AuthApi.middleware, ProductApi.middleware, CartApi.middleware),
})
export const persistor = persistStore(store)
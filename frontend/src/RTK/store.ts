import { configureStore } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { persistStore, persistReducer } from "redux-persist";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import todoSlice from "./Todo/TodoSlice";
import storage from "redux-persist/es/storage";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()


const persistConf = {
    key: 'todos',
    storage,
    whitelist: ["todos"]
}

const persistreducer = persistReducer(persistConf, todoSlice)

export const store = configureStore({
    reducer: {
        todos: persistreducer,
    }
})

export const persistor = persistStore(store)
import React, { useState } from 'react';
import { UserPlus } from "lucide-react";
import { usePostLoginMutation } from '../../../RTK/Auth/AuthQuery';
import type { InputFields } from '../../../type/inputfields';
import type { UserLogin } from '../../../type/Auth';


type Props = {
    onSwitchToLogin: React.Dispatch<React.SetStateAction<boolean>>
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm({ onSwitchToLogin, onClose }: Props) {
    // Временное состояние только для превью аватарки (без логики отправки)
    const [login] = usePostLoginMutation()
    const [logData, setLogData] = useState<UserLogin>({
        full_name: '',
        password: ''
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await login(logData).unwrap()
            onClose(false)
        } catch (err) {
            console.log(err)
        }
    }
    const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLogData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const loginFields: InputFields[] = [
        {
            label: 'Полное Имя',
            name: 'full_name',
            value: logData.full_name,
            placeholder: 'Enter your full name',
            onChange: (e) => { handleLogChange(e) },
        },
        {
            label: 'Пароль',
            name: 'password',
            value: logData.password,
            placeholder: 'Создайте пароль',
            onChange: (e) => { handleLogChange(e) },
            type: 'password'
        },
    ]



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 transition-colors duration-200">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm">

                {/* Хедер формы */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <UserPlus className="w-6 h-6 text-zinc-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50">
                        Войти в аккаунт
                    </h2>
                    <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">
                        Добро пожаловать в Mini apps
                    </p>
                </div>

                <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>

                    {loginFields.map((field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1.5 px-1">
                                {field.label}
                            </label>
                            <input
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-[15px]"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </div>
                    ))}
                    {/* Маленький бейджик-плюсик при наведении */}
                    <div className="absolute bottom-0 right-0 w-7 h-7 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <span className="text-gray-500 dark:text-zinc-400 text-sm font-bold">+</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-zinc-900 font-semibold rounded-2xl transition-all duration-150 active:scale-[0.98] text-[16px] shadow-sm"
                    >
                        Войти
                    </button>

                </form>
                <div className="mt-5 text-center">
                    <button
                        onClick={() => onSwitchToLogin(false)}
                        className="text-sm font-medium text-gray-400 dark:text-zinc-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                    >
                        Нет аккаунта ? Зарегистрироваться
                    </button>
                </div>
            </div >
        </div >
    );
}

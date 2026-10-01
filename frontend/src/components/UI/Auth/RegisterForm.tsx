import React, { useRef, useState } from 'react';
import { Camera, UserPlus, X } from "lucide-react";
import { useUploadAvatarMutation, usePostRegisterMutation } from '../../../RTK/Auth/AuthQuery';
import type { UserReg } from '../../../type/Auth';
import type { InputFields } from '../../../type/inputfields';

type Props = {
    onSwitchToLogin: React.Dispatch<React.SetStateAction<boolean>>
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterForm({ onSwitchToLogin, onClose }: Props) {
    // Временное состояние только для превью аватарки (без логики отправки)
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [regUser] = usePostRegisterMutation()
    const [addAvatar] = useUploadAvatarMutation()

    const [regForm, setRegForm] = useState<UserReg>({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        avatar_url: '',
    })

    const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setRegForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file)
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handelSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (avatarFile) {
                const res = await addAvatar(avatarFile)
                regForm.avatar_url = res.data?.image_url
            }

            const response = await regUser(regForm).unwrap()



            if (response) {
                onClose(false)
            }

        } catch (e) {
            console.log(`Ошибка при регистраций ${e}`)
        }
    }
    const regFields: InputFields[] = [
        {
            label: 'Полное Имя',
            name: 'full_name',
            value: regForm.full_name,
            placeholder: 'Enter your full name',
            onChange: (e) => { handleRegChange(e) },
        },
        {
            label: 'Пароль',
            name: 'password',
            value: regForm.password,
            placeholder: 'Создайте пароль',
            onChange: (e) => { handleRegChange(e) },
            type: 'password'
        },
        {
            label: 'Email',
            name: 'email',
            value: regForm.email,
            placeholder: 'exapmle@gmal.com',
            onChange: (e) => { handleRegChange(e) },
            type: 'email'
        },
        {
            label: 'Телефон',
            name: 'phone',
            value: regForm.phone,
            placeholder: '8777777777',
            onChange: (e) => { handleRegChange(e) }
        }
    ]

    return (
        <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[36px] px-10 py-8 shadow-sm">

            {/* КРЕСТИК ЗАКРЫТИЯ ПРЯМО В УГЛУ КАРТОЧКИ */}
            {onClose && (
                <button
                    onClick={() => onClose(false)}
                    className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {/* Шапка формы (ужали mb-6 вместо mb-8) */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                    <UserPlus className="w-6 h-6 text-zinc-900" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">
                    Создать аккаунт
                </h2>
                <p className="text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                    Добро пожаловать в доставку
                </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => handelSubmit(e)}>

                {/* ЗАГРУЗКА АВАТАРКИ */}
                <div className="flex flex-col items-center mb-2">
                    <label className="relative group cursor-pointer select-none">
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

                        <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-full overflow-hidden flex items-center justify-center transition-colors group-hover:border-yellow-400 dark:group-hover:border-yellow-500">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400 dark:text-zinc-500">
                                    <Camera className="w-5 h-5 mb-0.5 group-hover:text-gray-600 dark:group-hover:text-zinc-300" />
                                    <span className="text-[11px] font-medium">Фото</span>
                                </div>
                            )}
                        </div>
                    </label>
                </div>

                {/* ИМЯ ПОЛЬЗОВАТЕЛЯ */}
                {regFields.map((field) => (
                    <div>
                        <label className="block text-[14px] font-semibold text-gray-700 dark:text-zinc-300 mb-1 px-1">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-transparent dark:border-transparent rounded-2xl text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-[15px]"
                            onChange={field.onChange}
                            value={field.value}
                            name={field.name}
                        />

                    </div>
                ))}

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-zinc-900 font-bold rounded-2xl transition-all duration-150 active:scale-[0.98] text-[16px] shadow-sm"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>

            {/* Ссылка на переключение */}
            <div className="mt-5 text-center">
                <button
                    onClick={() => onSwitchToLogin(true)}
                    className="text-sm font-medium text-gray-400 dark:text-zinc-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                    Уже есть аккаунт? Войти
                </button>
            </div>

        </div>
    );
}
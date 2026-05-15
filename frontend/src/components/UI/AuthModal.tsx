import { useState } from "react"
import { usePostLoginMutation, usePostRegisterMutation } from "../../RTK/Auth/AuthQuery"
import type { InputFields } from "../../type/inputfields"
import type { UserReg, UserLogin } from "../../type/Auth"

import ModalWindow from "./ModalWindow"

type Props = {
    isOpen: boolean
    onClose: React.Dispatch<React.SetStateAction<boolean>>
    mode: 'login' | 'register'
    setMode: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

export default function AuthModal({ isOpen, onClose, mode, setMode }: Props) {
    const [login] = usePostLoginMutation()
    const [register] = usePostRegisterMutation()

    const [regData, setRegData] = useState<UserReg>({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        avatar_url: '',
    })
    const [logData, setLogData] = useState<UserLogin>({
        full_name: '',
        password: ''
    })

    const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target

        setRegData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLogData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (mode === 'login') {
                await login(logData).unwrap()
            } else {
                await register(regData).unwrap()
            }

            onClose(false)
        } catch (err) {
            console.log(err)
        }
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
        },
    ]

    const registerFields: InputFields[] = [
        {
            label: 'Полное Имя',
            name: 'full_name',
            value: regData.full_name,
            placeholder: 'Enter your full name',
            onChange: (e) => { handleRegChange(e) },
        },
        {
            label: 'Email',
            name: 'email',
            value: regData.email,
            placeholder: 'Enter your email (optional)',
            onChange: (e) => { handleRegChange(e) },
        },
        {
            label: 'Телефон',
            name: 'phone',
            value: regData.phone,
            placeholder: 'Enter your phone number',
            onChange: (e) => { handleRegChange(e) },
        },
        {
            label: 'Пароль',
            name: 'password',
            value: regData.password,
            placeholder: 'Создайте пароль',
            onChange: (e) => { handleRegChange(e) },
        },
    ]


    return (
        <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            header={mode === 'login' ? 'Вход' : 'Регистрация'}
            body={{
                InputFields: mode === 'login' ? loginFields : registerFields,
                handleSubmit: handleSubmit,
                button_text: mode === 'login' ? 'Войти' : 'Создать',
            }}

        />
    )
}
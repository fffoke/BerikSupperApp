import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Props = {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthModal({ onClose }: Props) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 transition-colors">

            {/* Сами компоненты форм */}
            {isLogin ? <LoginForm onSwitchToLogin={setIsLogin} onClose={onClose} /> : <RegisterForm onSwitchToLogin={setIsLogin} onClose={onClose} />}

            {/* Вёрстка переключателя под формой в стиле Лавки */}
            <div className="mt-6 text-center">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                    {isLogin
                        ? 'Ещё нет аккаунта? Зарегистрироваться'
                        : 'Уже есть аккаунт? Войти'}
                </button>
            </div>

        </div>
    );
}
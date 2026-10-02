import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SetTokens } from '../../../RTK/Auth/AuthSlice';
import { useAppDispatch } from '../../../RTK/store';
import type { TokenResponse } from '../../../type/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Props = {
    onClose: (open: boolean) => void;
};

export default function AuthModal({ onClose }: Props) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const onSuccess = (tokens: TokenResponse) => {
        dispatch(SetTokens(tokens));
        onClose(false);
        const from = (location.state as { from?: unknown } | null)?.from;
        const destination = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
            ? from
            : `${location.pathname}${location.search}${location.hash}`;
        navigate(destination, { replace: true, state: null });
    };

    return (
        <div className="px-7 pb-8 pt-9 sm:px-9">
            <div className="mb-7 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#fce000] text-xl font-black text-slate-950">B</span>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Berik Super App</p>
                    <h2 id="auth-title" className="text-2xl font-extrabold tracking-tight text-slate-950">
                        {mode === 'login' ? 'С возвращением' : 'Создать аккаунт'}
                    </h2>
                </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-slate-500">
                {mode === 'login' ? 'Войдите, чтобы открыть все приложения.' : 'Одна учётная запись для всех приложений.'}
            </p>

            <div role="tablist" aria-label="Авторизация" className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                <button type="button" role="tab" aria-selected={mode === 'login'} onClick={() => setMode('login')} className={`rounded-xl py-2.5 text-sm font-semibold transition ${mode === 'login' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Вход</button>
                <button type="button" role="tab" aria-selected={mode === 'register'} onClick={() => setMode('register')} className={`rounded-xl py-2.5 text-sm font-semibold transition ${mode === 'register' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Регистрация</button>
            </div>

            {mode === 'login' ? <LoginForm onSuccess={onSuccess} /> : <RegisterForm onSuccess={onSuccess} />}
        </div>
    );
}

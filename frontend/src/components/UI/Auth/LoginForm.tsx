import { useState, type FormEvent } from 'react';
import { usePostLoginMutation } from '../../../RTK/Auth/AuthQuery';
import type { TokenResponse } from '../../../type/Auth';

export default function LoginForm({ onSuccess }: { onSuccess: (tokens: TokenResponse) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [login, { isLoading }] = usePostLoginMutation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        try {
            const tokens = await login({ email: email.trim().toLowerCase(), password }).unwrap();
            onSuccess(tokens);
        } catch (reason) {
            const status = reason && typeof reason === 'object' && 'status' in reason ? reason.status : null;
            setError(status === 401 ? 'Неверная почта или пароль. Проверьте данные и попробуйте снова.' : 'Не удалось связаться с сервером. Попробуйте ещё раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">Электронная почта</label>
                <input id="login-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#e4c900] focus:bg-white focus:ring-4 focus:ring-yellow-100" />
            </div>
            <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">Пароль</label>
                <input id="login-password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Введите пароль" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#e4c900] focus:bg-white focus:ring-4 focus:ring-yellow-100" />
            </div>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full rounded-2xl bg-[#fce000] px-5 py-4 font-bold text-slate-950 transition hover:bg-[#f4d800] disabled:cursor-wait disabled:opacity-60">
                {isLoading ? 'Входим…' : 'Войти'}
            </button>
        </form>
    );
}

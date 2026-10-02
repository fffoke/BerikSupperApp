import { useState, type FormEvent } from 'react';
import { usePostRegisterMutation } from '../../../RTK/Auth/AuthQuery';
import type { TokenResponse } from '../../../type/Auth';

export default function RegisterForm({ onSuccess }: { onSuccess: (tokens: TokenResponse) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');
    const [register, { isLoading }] = usePostRegisterMutation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmation) {
            setError('Пароли не совпадают.');
            return;
        }
        setError('');
        try {
            const tokens = await register({ email: email.trim().toLowerCase(), password }).unwrap();
            onSuccess(tokens);
        } catch (reason) {
            const status = reason && typeof reason === 'object' && 'status' in reason ? reason.status : null;
            setError(status === 409 ? 'Эта почта уже зарегистрирована. Войдите в аккаунт.' : 'Не удалось создать аккаунт. Попробуйте ещё раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-slate-700">Электронная почта</label>
                <input id="register-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#e4c900] focus:bg-white focus:ring-4 focus:ring-yellow-100" />
            </div>
            <div>
                <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-700">Пароль</label>
                <input id="register-password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Минимум 8 символов" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#e4c900] focus:bg-white focus:ring-4 focus:ring-yellow-100" />
            </div>
            <div>
                <label htmlFor="register-confirmation" className="mb-2 block text-sm font-semibold text-slate-700">Повторите пароль</label>
                <input id="register-confirmation" type="password" required minLength={8} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Повторите пароль" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#e4c900] focus:bg-white focus:ring-4 focus:ring-yellow-100" />
            </div>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full rounded-2xl bg-[#fce000] px-5 py-4 font-bold text-slate-950 transition hover:bg-[#f4d800] disabled:cursor-wait disabled:opacity-60">
                {isLoading ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
            </button>
            <p className="text-center text-xs leading-relaxed text-slate-400">Для входа используйте эту почту и пароль.</p>
        </form>
    );
}

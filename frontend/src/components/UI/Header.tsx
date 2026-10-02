import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    ChevronDown, LayoutGrid, ListTodo, LogOut, Menu, Moon,
    Search, ShoppingBag, Sun, X,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../../RTK/store';
import { clearAll } from '../../RTK/Auth/AuthSlice';
import { AuthApi } from '../../RTK/Auth/AuthQuery';
import { ProductApi } from '../../RTK/Food_delivery/ProductQuery';
import { CartApi } from '../../RTK/Food_delivery/CartQuery';
import { LinkLists } from '../../routes/linklist';
import type { linkList } from '../../type/linkList';
import AuthModal from './Auth/AuthModal';
import BasicModel from './BasicModel';

function AppIcon({ id, size = 18 }: { id: linkList['id']; size?: number }) {
    const Icon = id === 'todo' ? ListTodo : id === 'food' ? ShoppingBag : LayoutGrid;
    return <Icon size={size} strokeWidth={2.1} aria-hidden="true" />;
}

export default function Header({ linkList }: { linkList: linkList }) {
    const { theme, toggle } = useTheme();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth.auth);
    const [authOpen, setAuthOpen] = useState(false);
    const [appsOpen, setAppsOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [search, setSearch] = useState('');
    const accountRef = useRef<HTMLDivElement>(null);
    const isFood = linkList.id === 'food';
    const accountName = auth.me.email || auth.me.full_name || 'Аккаунт';

    useEffect(() => {
        const state = location.state as { authRequired?: boolean } | null;
        if (state?.authRequired && !auth.is_auth) setAuthOpen(true);
    }, [location.key, location.state, auth.is_auth]);

    useEffect(() => {
        setSearch(location.pathname === '/food_delivery/search'
            ? new URLSearchParams(location.search).get('q') ?? ''
            : '');
        setAppsOpen(false);
        setAccountOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const closeMenus = (event: MouseEvent | KeyboardEvent) => {
            if (event instanceof KeyboardEvent) {
                if (event.key === 'Escape') {
                    setAppsOpen(false);
                    setAccountOpen(false);
                }
            } else if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener('mousedown', closeMenus);
        document.addEventListener('keydown', closeMenus);
        return () => {
            document.removeEventListener('mousedown', closeMenus);
            document.removeEventListener('keydown', closeMenus);
        };
    }, []);

    const logOut = () => {
        setAccountOpen(false);
        navigate('/', { replace: true, state: null });
        dispatch(clearAll());
        dispatch(AuthApi.util.resetApiState());
        dispatch(ProductApi.util.resetApiState());
        dispatch(CartApi.util.resetApiState());
    };

    const searchProducts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = search.trim();
        navigate(query ? `/food_delivery/search?q=${encodeURIComponent(query)}` : '/food_delivery');
    };

    const appIsActive = (app: linkList) => app.id === 'hub'
        ? location.pathname === '/' || location.pathname === '/contact'
        : location.pathname === app.homePath || location.pathname.startsWith(`${app.homePath}/`);

    const sectionIsActive = (path: string) => {
        if (isFood && path === '/food_delivery') return !location.pathname.startsWith('/food_delivery/cart');
        return location.pathname === path;
    };

    const appLinks = LinkLists.map((app) => (
        <Link
            key={app.id}
            to={app.homePath}
            onClick={() => setAppsOpen(false)}
            aria-current={appIsActive(app) ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${appIsActive(app)
                ? 'bg-[#fce000] text-slate-950'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
        >
            <AppIcon id={app.id} />
            <span>{app.appName}</span>
        </Link>
    ));

    return (
        <header className="relative z-50 border-b border-slate-200 bg-white text-slate-950 shadow-[0_6px_24px_-20px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-950 dark:text-white">
            <div className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-8">
                <div className="flex h-[70px] items-center gap-3">
                    <Link to="/" aria-label="Главная страница Berik Super App" className="group flex shrink-0 items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-[#fce000] text-lg font-black text-slate-950 transition-transform group-hover:rotate-[-7deg]">B</span>
                        <span className="hidden text-[15px] font-extrabold tracking-tight sm:inline">Berik <span className="font-medium text-slate-400">Super App</span></span>
                    </Link>

                    <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block xl:hidden" />
                    <span className="flex min-w-0 items-center gap-2 text-sm font-bold sm:text-base xl:hidden">
                        <AppIcon id={linkList.id} size={20} />
                        <span className="truncate">{linkList.appName}</span>
                    </span>

                    <nav aria-label="Приложения" className="ml-5 hidden items-center gap-1 xl:flex">
                        {appLinks}
                    </nav>

                    <div className="ml-auto flex shrink-0 items-center gap-2">
                        <button type="button" onClick={toggle} aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'} title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'} className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
                            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
                        </button>

                        {auth.is_auth ? (
                            <div ref={accountRef} className="relative">
                                <button type="button" onClick={() => setAccountOpen((open) => !open)} aria-expanded={accountOpen} aria-haspopup="menu" aria-label="Меню аккаунта" className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-1.5 pr-2.5 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white dark:bg-[#fce000] dark:text-slate-950">{accountName.charAt(0).toUpperCase()}</span>
                                    <span className="hidden max-w-[160px] truncate text-xs font-semibold sm:block">{accountName}</span>
                                    <ChevronDown size={15} className={`text-slate-400 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {accountOpen && (
                                    <div role="menu" className="absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
                                        <p className="truncate px-3 py-2 text-xs text-slate-500 dark:text-slate-400" title={accountName}>{accountName}</p>
                                        <button type="button" role="menuitem" onClick={logOut} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                                            <LogOut size={17} /> Выйти из аккаунта
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button type="button" onClick={() => setAuthOpen(true)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-[#fce000] dark:text-slate-950 dark:hover:bg-yellow-300">Войти</button>
                        )}

                        <button type="button" onClick={() => setAppsOpen((open) => !open)} aria-label={appsOpen ? 'Закрыть меню приложений' : 'Открыть меню приложений'} aria-expanded={appsOpen} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 xl:hidden">
                            {appsOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                <div className={`flex flex-col gap-3 border-t border-slate-100 py-2.5 dark:border-slate-800 sm:flex-row sm:items-center ${isFood ? 'sm:justify-between' : ''}`}>
                    <nav aria-label={`Разделы: ${linkList.appName}`} className={`flex min-w-0 gap-1 overflow-x-auto ${isFood ? 'order-2 sm:order-1' : ''}`}>
                        {linkList.links.map((item) => (
                            <Link key={item.path} to={item.path} aria-current={sectionIsActive(item.path) ? 'page' : undefined} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${sectionIsActive(item.path)
                                ? 'bg-slate-900 text-white dark:bg-[#fce000] dark:text-slate-950'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'}`}>
                                {item.pathText}
                            </Link>
                        ))}
                    </nav>

                    {isFood && (
                        <form onSubmit={searchProducts} role="search" className="order-1 flex h-10 w-full items-center gap-2 rounded-xl bg-slate-100 px-3 text-slate-500 transition-colors focus-within:ring-2 focus-within:ring-[#fce000] dark:bg-slate-800 dark:text-slate-300 sm:order-2 sm:max-w-[420px]">
                            <button type="submit" aria-label="Найти товары" className="rounded-lg p-1 transition hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"><Search size={18} /></button>
                            <input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Поиск товаров" placeholder="Найти товар в магазине" className="min-w-0 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white" />
                            {search && <button type="button" onClick={() => setSearch('')} aria-label="Очистить поиск" className="rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"><X size={15} /></button>}
                        </form>
                    )}
                </div>
            </div>

            {appsOpen && (
                <nav aria-label="Меню приложений" className="grid grid-cols-1 gap-1 border-t border-slate-100 px-4 py-3 dark:border-slate-800 sm:grid-cols-3 sm:px-6 xl:hidden">
                    {appLinks}
                </nav>
            )}

            <BasicModel isOpen={authOpen} onClose={setAuthOpen}>
                <AuthModal onClose={setAuthOpen} />
            </BasicModel>
        </header>
    );
}

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import type { linkList } from "../../type/linkList"
import ThemeToggle from "./TehemeChangeEl"
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../RTK/store";
import { clearAll } from "../../RTK/Auth/AuthSlice";
import { CartApi } from "../../RTK/Food_delivery/CartQuery";
import AuthModal from "./Auth/AuthModal";
import BasicModel from "./BasicModel";
import { BASE_URL } from "../../RTK/Food_delivery/ProductQuery";

type Props = {
    linkList: linkList
}

export default function Header({ linkList }: Props) {
    const { theme, toggle } = useTheme()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const auth = useAppSelector((state) => state.auth.auth)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (location.pathname === '/food_delivery/search') {
            setSearch(new URLSearchParams(location.search).get('q') ?? '')
        }
    }, [location.pathname, location.search])
    const logOut = () => {
        dispatch(clearAll())
        dispatch(CartApi.util.resetApiState())
    }
    if (linkList.appName === 'Food Delivery') {
        return (
            <header className="relative z-50 border-b border-gray-100 bg-white">
                <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
                    <Link to="/food_delivery" aria-label="Главная страница магазина" className="flex shrink-0 items-center gap-2 font-extrabold text-gray-950">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-2xl font-black text-white">B</span>
                        <span className="hidden text-lg sm:inline">Berik Лавка</span>
                    </Link>
                    <form onSubmit={(event) => { event.preventDefault(); navigate(search.trim() ? `/food_delivery/search?q=${encodeURIComponent(search.trim())}` : '/food_delivery') }} className="order-3 flex w-full items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 sm:order-2 sm:max-w-[480px] sm:flex-1">
                        <button type="submit" aria-label="Найти товары" className="text-xl text-gray-700"><FiSearch /></button>
                        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Найти в магазине" aria-label="Поиск товаров" className="min-w-0 flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400" />
                    </form>
                    <span className="order-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm text-gray-600 sm:order-3">Демо-каталог</span>
                    <div className="order-2 ml-auto flex items-center gap-3 sm:order-4">
                        <Link to="/" className="hidden text-sm text-gray-500 hover:text-gray-900 lg:inline">Все приложения</Link>
                        {auth.is_auth ? (
                            <>
                                <span className="hidden text-sm font-medium text-gray-800 sm:inline">{auth.me?.full_name}</span>
                                <button type="button" onClick={logOut} aria-label="Выйти" className="rounded-full bg-gray-100 p-3 text-gray-700"><FiLogOut /></button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsOpen(true)} className="rounded-full bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-200">Войти</button>
                        )}
                    </div>
                </div>
                <BasicModel isOpen={isOpen} onClose={setIsOpen} children={<AuthModal onClose={setIsOpen} />} />
            </header>
        )
    }
    return (
        <header className="relative z-50">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <div className="w-48 h-16 flex items-center justify-center">
                            <img
                                src={linkList.image.length > 1 && theme === 'dark' ? linkList.image[1] : linkList.image[0]}
                                alt="logo"
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{linkList.appName}</span>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 " id="mobile-menu-2">
                        <ul className="flex  flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {linkList.links.map((el) => (
                                <li key={el.path}>
                                    <Link to={el.path} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                        {el.pathText}
                                    </Link>
                                </li>
                            ))}

                            {/* <li>
                                <Link to={'/todo/erorr'} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                    404 Error
                                </Link>
                            </li> */}
                            <li>
                                <ThemeToggle toggle={toggle} theme={theme} />
                            </li>
                            <li>
                                <Link to={'/'} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                    <div className="flex items-center justify-center">
                                        Exit.  <FiLogOut />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                {auth.is_auth ? (
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={auth.me?.avatar_url ? BASE_URL + auth.me.avatar_url : '/static/appLogo.png'}
                                            alt="avatar"
                                            className="h-8 w-8 rounded-full object-cover"
                                        />

                                        <span className="text-sm font-medium">
                                            {auth.me?.full_name}
                                        </span>
                                        <button onClick={logOut}>LogOut</button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {

                                                setIsOpen(true)
                                            }}
                                            className="px-3 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700"
                                        >
                                            Вход
                                        </button>
                                    </div>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <BasicModel
                isOpen={isOpen}
                onClose={setIsOpen}
                children={<AuthModal onClose={setIsOpen} />}
            />
        </header>
    )
}


// Источник на хедер я взял с https://flowbite.com/blocks/marketing/header/
// Источник для иконки взял с https://icons8.com/icons/set/todo-list    

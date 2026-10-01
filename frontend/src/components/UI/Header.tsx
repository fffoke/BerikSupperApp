import { Link } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import type { linkList } from "../../type/linkList"
import ThemeToggle from "./TehemeChangeEl"
import { FiLogOut } from 'react-icons/fi';
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../RTK/store";
import { clearAll } from "../../RTK/Auth/AuthSlice";
import AuthModal from "./Auth/AuthModal";
import BasicModel from "./BasicModel";
import { BASE_URL } from "../../RTK/Food_delivery/ProductQuery";

type Props = {
    linkList: linkList
}

export default function Header({ linkList }: Props) {
    const { theme, toggle } = useTheme()
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth.auth)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const logOut = () => {
        dispatch(clearAll())
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
                                            src={BASE_URL + auth.me?.avatar_url || '/default-avatar.png'}
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

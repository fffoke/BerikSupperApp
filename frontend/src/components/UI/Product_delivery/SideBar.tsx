import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import type { ParentCategoryResponse } from '../../../type/Food_delivery/Product';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
    data: ParentCategoryResponse | undefined,
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
}

const CategorySidebar = ({ data, isLoading, error }: Props) => {
    // const { data, isLoading, error } = useGetCatalogQuery();

    if (isLoading) return <div className="w-72 p-4">Загрузка каталога...</div>;
    if (error) return <div className="w-72 p-4 text-red-500">Ошибка загрузки</div>;
    if (data == undefined) return <div className="w-72 p-4 text-red-500">Ошибка загрузки</div>;
    return (
        <aside className="w-[320px] h-screen sticky top-0 bg-white border-r border-gray-100 overflow-y-auto hidden md:block">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6 px-2 text-gray-900">Каталог</h1>

                <nav className="flex flex-col gap-1">
                    {data.categorys.map((category) => (

                        <NavLink

                            key={category.id}
                            to={`/food_delivery/category/${category.slug}`}
                            className={({ isActive }) => `
                                flex items-center gap-3 p-3 rounded-2xl transition-all duration-200
                                ${isActive
                                    ? 'bg-gray-100 shadow-sm'
                                    : 'hover:bg-gray-50 active:scale-95'}
                            `}
                        >
                            {/* Контейнер для иконки как в Лавке */}
                            <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-full overflow-hidden flex items-center justify-center">
                                {category.image_url ? (
                                    <img
                                        src={BASE_URL + category.image_url}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                )}
                            </div>

                            <span className="text-[15px] font-medium text-gray-800 leading-tight">
                                {category.name}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside >
    );
};

export default CategorySidebar;

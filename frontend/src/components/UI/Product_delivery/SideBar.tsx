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

    if (isLoading) return <div className="w-full p-4 md:w-72">Загрузка каталога...</div>;
    if (error) return <div className="w-full p-4 text-red-500 md:w-72">Ошибка загрузки</div>;
    if (data == undefined) return <div className="w-full p-4 text-red-500 md:w-72">Ошибка загрузки</div>;

    const links = data.categorys.map((category) => (
        <NavLink
            key={category.id}
            to={`/food_delivery/category/${category.slug}`}
            className={({ isActive }) => `
                flex shrink-0 items-center gap-3 rounded-2xl p-3 transition-all duration-200
                ${isActive ? 'bg-gray-100 shadow-sm' : 'hover:bg-gray-50 active:scale-95'}
            `}
        >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                {category.image_url ? (
                    <img src={BASE_URL + category.image_url} alt={category.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                )}
            </div>
            <span className="text-[15px] font-medium leading-tight text-gray-800">{category.name}</span>
        </NavLink>
    ));

    return (
        <>
            <aside className="sticky top-0 hidden h-screen w-[280px] flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-white md:block xl:w-[320px]">
                <div className="p-4">
                    <h1 className="mb-6 px-2 text-2xl font-bold text-gray-900">Каталог</h1>
                    <nav className="flex flex-col gap-1">{links}</nav>
                </div>
            </aside>
            <nav aria-label="Категории каталога" className="flex w-full gap-2 overflow-x-auto border-b border-gray-100 bg-white px-3 py-2 md:hidden">
                {links}
            </nav>
        </>
    );
};

export default CategorySidebar;

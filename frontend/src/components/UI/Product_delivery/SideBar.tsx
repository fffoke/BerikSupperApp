import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import type { CategoryResponse, ParentCategoryResponse } from '../../../type/Food_delivery/Product';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
    data: ParentCategoryResponse | undefined;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
};

const CategoryBranch = ({ category, depth = 0 }: { category: CategoryResponse; depth?: number }) => (
    <div>
        <NavLink
            to={`/food_delivery/category/${category.slug}`}
            className={({ isActive }) => `flex items-center gap-2 rounded-xl px-2 py-2 transition ${depth === 0 ? 'text-[15px] font-semibold' : 'text-sm'} ${isActive ? 'bg-gray-100 text-gray-950' : 'text-gray-700 hover:bg-gray-50'}`}
            style={{ paddingLeft: `${8 + depth * 14}px` }}
        >
            {depth === 0 && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                    {category.image_url ? <img src={BASE_URL + category.image_url} alt="" className="h-full w-full object-cover" /> : null}
                </span>
            )}
            <span>{category.name}</span>
        </NavLink>
        {category.children.length > 0 && (
            <div className="mt-1 border-l border-gray-100" style={{ marginLeft: `${depth === 0 ? 26 : 12}px` }}>
                {category.children.map((child) => <CategoryBranch key={child.id} category={child} depth={depth + 1} />)}
            </div>
        )}
    </div>
);

const CategorySidebar = ({ data, isLoading, error }: Props) => {
    if (isLoading) return <div className="w-full p-4 md:w-72">Загрузка каталога...</div>;
    if (error || !data) return <div className="w-full p-4 text-red-500 md:w-72">Ошибка загрузки</div>;

    return (
        <>
            <aside className="sticky top-0 hidden h-screen w-[280px] flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-white md:block xl:w-[320px]">
                <div className="p-4">
                    <h1 className="mb-5 px-2 text-2xl font-bold text-gray-900">Каталог</h1>
                    <nav className="flex flex-col gap-1">{data.categorys.map((category) => <CategoryBranch key={category.id} category={category} />)}</nav>
                </div>
            </aside>
            <nav aria-label="Категории каталога" className="flex w-full gap-2 overflow-x-auto border-b border-gray-100 bg-white px-3 py-2 md:hidden">
                {data.categorys.map((category) => (
                    <NavLink key={category.id} to={`/food_delivery/category/${category.slug}`} className={({ isActive }) => `shrink-0 rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {category.name}
                    </NavLink>
                ))}
            </nav>
        </>
    );
};

export default CategorySidebar;

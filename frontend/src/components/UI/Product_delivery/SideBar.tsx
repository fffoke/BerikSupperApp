import { Link, NavLink } from 'react-router-dom';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import type { CategoryResponse, ParentCategoryResponse } from '../../../type/Food_delivery/Product';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
    data: ParentCategoryResponse | undefined;
    selectedPath: CategoryResponse[];
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
};

export const ROOT_ORDER = [
    'Готовая еда', 'Овощной прилавок', 'Молочный прилавок',
    'Булочная и кондитерская', 'Вода и напитки', 'Сладкое и снеки',
    'Заморозка', 'Мясо, птица, рыба', 'Сбалансированное питание',
    'Бакалея', 'Для детей',
];

export function orderRoots(categories: CategoryResponse[]): CategoryResponse[] {
    return [...categories].sort((a, b) => {
        const aIndex = ROOT_ORDER.indexOf(a.name);
        const bIndex = ROOT_ORDER.indexOf(b.name);
        return (aIndex < 0 ? Infinity : aIndex) - (bIndex < 0 ? Infinity : bIndex);
    });
}

const CategorySidebar = ({ data, selectedPath, isLoading, error }: Props) => {
    if (isLoading) return <div className="w-full p-4 md:w-64">Загрузка каталога...</div>;
    if (error || !data) return <div role="alert" className="w-full p-4 text-red-500 md:w-64">Ошибка загрузки каталога</div>;

    const roots = orderRoots(data.categorys);
    const root = selectedPath[0];
    const section = selectedPath[1];
    const isLocal = Boolean(section);
    const localItems = section?.children.length ? section.children : root?.children ?? [];
    const desktopLinks = isLocal ? localItems : roots;
    const mobileLinks = isLocal ? localItems : roots;

    return (
        <>
            <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 overflow-y-auto border-r border-gray-100 bg-white md:block xl:w-[290px]">
                <div className="px-4 py-6">
                    {isLocal ? (
                        <>
                            <Link to={`/food_delivery/category/${root.slug}`} className="mb-4 block px-2 text-sm text-gray-400 hover:text-gray-700">← {root.name}</Link>
                            <NavLink to={`/food_delivery/category/${section.slug}`} className={({ isActive }) => `mb-3 block rounded-xl px-3 py-3 text-lg font-bold ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                                {section.name}
                            </NavLink>
                        </>
                    ) : (
                        <Link to="/food_delivery" className="mb-5 block px-2 text-xl font-bold text-gray-900">Каталог</Link>
                    )}
                    <nav className="flex flex-col gap-1" aria-label={isLocal ? `Разделы ${section.name}` : 'Разделы каталога'}>
                        {desktopLinks.map((category) => (
                            <NavLink
                                key={category.id}
                                to={`/food_delivery/category/${category.slug}`}
                                className={({ isActive }) => `flex min-h-12 items-center gap-3 rounded-xl px-2 py-2 text-[15px] leading-snug transition ${isActive ? 'bg-gray-100 font-semibold text-gray-950' : 'text-gray-800 hover:bg-gray-50'}`}
                            >
                                {!isLocal && (
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                                        {category.image_url && <img src={BASE_URL + category.image_url} alt="" className="h-full w-full object-cover" />}
                                    </span>
                                )}
                                <span>{category.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </aside>
            <nav aria-label={isLocal ? `Разделы ${section.name}` : 'Разделы каталога'} className="flex w-full gap-2 overflow-x-auto border-b border-gray-100 bg-white px-3 py-3 md:hidden">
                {isLocal && <Link to={`/food_delivery/category/${section.slug}`} className="shrink-0 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-gray-900">{section.name}</Link>}
                {mobileLinks.map((category) => (
                    <NavLink key={category.id} to={`/food_delivery/category/${category.slug}`} className={({ isActive }) => `shrink-0 rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        {category.name}
                    </NavLink>
                ))}
            </nav>
        </>
    );
};

export default CategorySidebar;

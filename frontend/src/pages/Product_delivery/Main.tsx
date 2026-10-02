import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCatalogQuery, useSearchProductsQuery } from '../../RTK/Food_delivery/ProductQuery';
import type { CategoryResponse } from '../../type/Food_delivery/Product';
import CategorySidebar from '../../components/UI/Product_delivery/SideBar';
import CatalogHome, { CategoryTiles } from '../../components/UI/Product_delivery/CatagoryCard';
import CartSidebar from '../../components/UI/Product_delivery/CartSideBar';
import ProductList from '../../components/UI/Product_delivery/ProdutcList';
import ProductCard from '../../components/UI/Product_delivery/ProductCard';

function findCategoryPath(categories: CategoryResponse[], slug: string, parents: CategoryResponse[] = []): CategoryResponse[] {
    for (const category of categories) {
        const path = [...parents, category];
        if (category.slug === slug) return path;
        const childPath = findCategoryPath(category.children, slug, path);
        if (childPath.length) return childPath;
    }
    return [];
}

export default function Main() {
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const isSearchPage = location.pathname === '/food_delivery/search';
    const query = searchParams.get('q')?.trim() ?? '';
    const catalogResult = useGetCatalogQuery();
    const searchResult = useSearchProductsQuery(isSearchPage && query ? query : skipToken);
    const roots = catalogResult.data?.categorys ?? [];
    const selectedPath = slug ? findCategoryPath(roots, slug) : [];
    const selected = selectedPath.at(-1);
    const displayName = selected?.name === 'Есть горячее' ? '«Есть горячее»' : selected?.name;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname, location.search]);

    return (
        <div className="flex min-h-screen flex-col bg-white md:flex-row">
            <CategorySidebar
                data={catalogResult.data}
                selectedPath={selectedPath}
                isLoading={catalogResult.isLoading}
                error={catalogResult.error}
            />

            <main className="min-w-0 flex-1 overflow-y-auto bg-white pb-24 lg:pb-0">
                {catalogResult.isLoading ? (
                    <div className="p-8 text-gray-500">Загрузка каталога...</div>
                ) : catalogResult.error ? (
                    <div role="alert" className="p-8 text-red-600">Не удалось загрузить каталог.</div>
                ) : isSearchPage ? (
                    <div className="mx-auto max-w-[980px] px-5 py-7 sm:px-8">
                        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-950">Поиск: {query || 'введите название товара'}</h1>
                        {searchResult.isLoading ? <p className="text-gray-500">Ищем товары...</p>
                            : searchResult.error ? <p role="alert" className="text-red-600">Не удалось выполнить поиск.</p>
                                : searchResult.data?.products.length ? (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {searchResult.data.products.map((product) => <ProductCard key={product.id} {...product} />)}
                                    </div>
                                ) : query ? <p className="text-gray-500">По вашему запросу товары не найдены.</p> : null}
                    </div>
                ) : slug && !selected ? (
                    <div className="p-8 text-gray-500">Категория не найдена.</div>
                ) : selected ? (
                    <div className="mx-auto max-w-[980px] px-5 py-7 sm:px-8">
                        <nav aria-label="Путь в каталоге" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                            <Link to="/food_delivery" className="hover:text-gray-900">Главная</Link>
                            {selectedPath.slice(0, -1).map((category) => (
                                <span key={category.id} className="flex items-center gap-2">
                                    <span>›</span>
                                    <Link to={`/food_delivery/category/${category.slug}`} className="hover:text-gray-900">{category.name}</Link>
                                </span>
                            ))}
                            <span>›</span>
                            <span className="text-gray-700">{displayName}</span>
                        </nav>
                        <h1 className="mb-9 text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">{displayName}</h1>
                        {selectedPath.length === 1 && selected.children.length > 0 ? (
                            <CategoryTiles categories={selected.children} />
                        ) : (
                            <ProductList slug={selected.slug} flat={selectedPath.length >= 3 || (selectedPath.length === 1 && selected.children.length === 0)} children={selected.children} />
                        )}
                    </div>
                ) : (
                    <CatalogHome categories={roots} />
                )}
            </main>

            <CartSidebar />
        </div>
    );
}

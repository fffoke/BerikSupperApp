import CategorySidebar from '../../components/UI/Product_delivery/SideBar';
import CategoryGrid from '../../components/UI/Product_delivery/CatagoryCard';
import CartSidebar from '../../components/UI/Product_delivery/CartSideBar';
import { useGetCatalogQuery, useGetParentCategoryQuery } from '../../RTK/Food_delivery/ProductQuery';
import { Link, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import ProductList from '../../components/UI/Product_delivery/ProdutcList';
import { BASE_URL } from '../../RTK/Food_delivery/ProductQuery';

export default function Main() {

    const { slug } = useParams<{ slug: string }>();
    const catalogResult = useGetCatalogQuery()

    const categoryResult = useGetParentCategoryQuery(slug ?? skipToken)

    return (
        <div className="flex min-h-screen flex-col bg-white md:flex-row">
            <CategorySidebar data={catalogResult.data} isLoading={catalogResult.isLoading} error={catalogResult.error} />

            <main className="min-w-0 flex-1 overflow-y-auto bg-white pb-24 lg:pb-0">
                {slug ? (
                    <>
                        {categoryResult.data?.categorys.length ? (
                            <section className="px-6 pt-6">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Подкатегории</h2>
                                <div className="flex gap-3 overflow-x-auto pb-3">
                                    {categoryResult.data.categorys.map((category) => (
                                        <Link key={category.id} to={`/food_delivery/category/${category.slug}`} className="flex w-36 shrink-0 flex-col gap-2 rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100">
                                            <img src={category.image_url ? `${BASE_URL}${category.image_url}` : '/static/CategoryUnavailable@2x.png'} alt="" className="h-24 w-full rounded-xl object-contain" />
                                            <span className="text-sm font-semibold text-gray-900">{category.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ) : null}
                        <ProductList slug={slug} />
                    </>
                ) : <CategoryGrid />}
            </main>

            <CartSidebar />
        </div>
    );
};

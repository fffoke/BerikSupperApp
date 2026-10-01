import CategorySidebar from '../../components/UI/Product_delivery/SideBar';
import CategoryGrid from '../../components/UI/Product_delivery/CatagoryCard';
import CartSidebar from '../../components/UI/Product_delivery/CartSideBar';
import { useGetCatalogQuery, useGetParentCategoryQuery } from '../../RTK/Food_delivery/ProductQuery';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import ProductList from '../../components/UI/Product_delivery/ProdutcList';

export default function Main() {

    const { slug } = useParams<{ slug: string }>();
    const catalogResult = useGetCatalogQuery(undefined, {
        skip: !!slug
    })

    const categoryResult = useGetParentCategoryQuery(slug ?? skipToken)

    const data = slug ? categoryResult.data : catalogResult.data
    const isLoading = slug ? categoryResult.isLoading : catalogResult.isLoading
    const error = slug ? categoryResult.error : catalogResult.error



    return (
        <div className="flex min-h-screen bg-white">
            <CategorySidebar data={data} isLoading={isLoading} error={error} />

            <main className="flex-1 min-w-0 bg-white overflow-y-auto">
                {slug ? <ProductList slug={slug} /> : <CategoryGrid />}
            </main>

            {/* Правая панель - фиксированная ширина */}
            <div className="w-[380px] flex-shrink-0 sticky top-0 h-screen border-l border-gray-100 hidden xl:block">
                <CartSidebar />
            </div>
        </div>
    );
};

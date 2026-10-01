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
        <div className="flex min-h-screen flex-col bg-white md:flex-row">
            <CategorySidebar data={data} isLoading={isLoading} error={error} />

            <main className="min-w-0 flex-1 overflow-y-auto bg-white pb-24 lg:pb-0">
                {slug ? <ProductList slug={slug} /> : <CategoryGrid />}
            </main>

            <CartSidebar />
        </div>
    );
};

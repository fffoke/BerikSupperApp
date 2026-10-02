import ProductCard from './ProductCard';
import { useGetAllParentProductQuery } from '../../../RTK/Food_delivery/ProductQuery';
import { Link } from 'react-router-dom';
import type { CategoryResponse } from '../../../type/Food_delivery/Product';


type Props = {
    slug: string;
    flat?: boolean;
    children?: CategoryResponse[];
}

export default function ProductList({ slug, flat = false, children = [] }: Props) {
    const { data, isLoading, error } = useGetAllParentProductQuery(slug)
    // Блок обработки состояний (вёрстка заглушек)
    if (isLoading) {
        return (
            <div className="flex flex-col gap-10 p-6 bg-white animate-pulse">
                {[1, 2].map((section) => (
                    <div key={section} className="w-full">
                        <div className="h-8 bg-gray-200 rounded-md w-56 mb-4"></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                            {[1, 2, 3, 4, 5].map((card) => (
                                <div key={card} className="aspect-[3/4] bg-gray-100 rounded-3xl w-full"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500 font-medium">
                Произошла ошибка при загрузке товаров.
            </div>
        );
    }

    const order = new Map(children.map((child, index) => [child.name, index]));
    const categories = [...(data || [])].sort((a, b) =>
        (order.get(a.category_name) ?? Infinity) - (order.get(b.category_name) ?? Infinity)
    );

    if (categories.length === 0) {
        return (
            <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-500">
                В этом разделе пока нет товаров.
            </div>
        );
    }

    // Основная разметка ленты
    return (
        <div className="flex w-full flex-col gap-12 bg-white">
            {categories.map((category, index) => (
                <section key={index} className="w-full">

                    {!flat && (
                        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            {children.find((child) => child.name === category.category_name) ? (
                                <Link to={`/food_delivery/category/${children.find((child) => child.name === category.category_name)?.slug}`} className="hover:underline">
                                    {category.category_name}
                                </Link>
                            ) : category.category_name}
                        </h2>
                    )}

                    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3">
                        {category.products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image_url={product.image_url}
                                volume={product.volume}
                                discount={product.discount}
                            />
                        ))}
                    </div>

                </section>
            ))}
        </div>
    );
}

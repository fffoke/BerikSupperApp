import ProductCard from './ProductCard';
import { useGetAllParentProductQuery } from '../../../RTK/Food_delivery/ProductQuery';
import { skipToken } from '@reduxjs/toolkit/query';


type Props = {
    slug: string
}

export default function ProductList({ slug }: Props) {
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

    const categories = data || [];

    if (categories.length === 0) {
        return (
            <div className="p-6 text-center text-gray-400">
                Товары не найдены
            </div>
        );
    }

    // Основная разметка ленты
    return (
        <div className="flex flex-col gap-12 p-8 bg-white w-full">
            {categories.map((category, index) => (
                <section key={index} className="w-full">

                    {/* Заголовок подкатегории */}
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {category.category_name}
                    </h2>

                    {/* Умная адаптивная сетка, которая держит размер карточки */}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(145px,1fr))] gap-x-3 gap-y-6 w-full">
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
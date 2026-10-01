import { useGetCatalogQuery } from '../../../RTK/Food_delivery/ProductQuery';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';

const CategoryGrid = () => {
    const { data, isLoading, error } = useGetCatalogQuery();
    const navigate = useNavigate();

    if (isLoading) return <div className="p-6">Загрузка категорий...</div>;
    if (error) return <div role="alert" className="p-6 text-red-600">Не удалось загрузить каталог.</div>;
    if (!data?.categorys.length) return <div className="p-6 text-gray-500">Каталог пока пуст.</div>;


    return (
        <section className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Каталог</h2>

            {/* Сетка: 1 колонка на мобилках, 2 на средних экранах, 3 на больших */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.categorys.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => navigate(`/food_delivery/category/${category.slug}`)}
                        className="relative group cursor-pointer overflow-hidden rounded-[32px] h-[200px] transition-transform active:scale-95"
                    >
                        {/* Изображение категории как фон */}
                        <img
                            src={category.image_url ? `${BASE_URL}${category.image_url}` : '/static/CategoryUnavailable@2x.png'}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Текст внутри картинки (как в Лавке - сверху слева) */}
                        <div className="relative z-10 p-6 h-full flex flex-col justify-start">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 max-w-[180px]">
                                «{category.name}»
                            </h3>
                        </div>

                        {/* Легкое затемнение или высветление, если картинки слишком яркие */}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;

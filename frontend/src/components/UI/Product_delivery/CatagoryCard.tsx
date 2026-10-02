import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import type { CategoryResponse } from '../../../type/Food_delivery/Product';
import { orderRoots } from './SideBar';

const COLORS = ['#ffbd32', '#ffecb2', '#b1edfa', '#f7e1b7', '#e6f5d0', '#f3e3ef'];

export function CategoryTiles({ categories }: { categories: CategoryResponse[] }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {categories.map((category, index) => {
                const isBanner = category.image_url?.endsWith('.webp');
                return (
                    <Link
                        key={category.id}
                        to={`/food_delivery/category/${category.slug}`}
                        className="group relative block aspect-[2.1/1] overflow-hidden rounded-[30px] transition active:scale-[0.98]"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                        {category.image_url && (
                            <img
                                src={BASE_URL + category.image_url}
                                alt=""
                                className={`absolute h-full transition duration-300 group-hover:scale-105 ${isBanner ? 'inset-0 w-full object-cover' : 'bottom-0 right-0 w-[58%] object-contain'}`}
                            />
                        )}
                        <h3 className="relative z-10 max-w-[68%] p-5 text-xl font-bold leading-tight text-gray-950 sm:text-2xl">{category.name}</h3>
                    </Link>
                );
            })}
        </div>
    );
}

const featured = [
    { name: '«Из Лавки»', image: '/static/categories/iz-lavki-banner.webp', target: 'Пицца' },
    { name: '«Лавка 100»', image: '/static/categories/lavka-100-banner.webp', target: 'Сырники и запеканки' },
];

function findByName(categories: CategoryResponse[], name: string): CategoryResponse | undefined {
    for (const category of categories) {
        if (category.name === name) return category;
        const child = findByName(category.children, name);
        if (child) return child;
    }
}

export default function CatalogHome({ categories }: { categories: CategoryResponse[] }) {
    const roots = orderRoots(categories);
    const readyFood = roots.find((category) => category.name === 'Готовая еда');
    const rest = roots.filter((category) => category.id !== readyFood?.id);

    return (
        <div className="mx-auto flex max-w-[980px] flex-col gap-14 px-5 py-7 sm:px-8">
            <section>
                <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">Придумано Яндекс Лавкой</h1>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {featured.map((item) => (
                        <Link key={item.name} to={`/food_delivery/category/${findByName(roots, item.target)?.slug ?? ''}`} className="group relative block aspect-[2.1/1] overflow-hidden rounded-[30px] bg-sky-100 transition active:scale-[0.98]">
                            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                            <h2 className="relative z-10 p-5 text-xl font-bold text-gray-950 sm:text-2xl">{item.name}</h2>
                        </Link>
                    ))}
                </div>
            </section>
            {readyFood && (
                <section>
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">Готовая еда</h2>
                    <CategoryTiles categories={readyFood.children} />
                </section>
            )}
            <section>
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">Каталог</h2>
                <CategoryTiles categories={rest} />
            </section>
        </div>
    );
}

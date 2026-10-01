import type { CartCreateResponse } from '../../../type/Food_delivery/Cart';
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import { useActualQuantity } from '../../../hooks/Product_delivery/userActualQuantity';

interface CartProductCardProps {
    item: CartCreateResponse;
}

export default function CartProductCardEl({ item }: CartProductCardProps) {
    // Временный стейт-заглушка для демонстрации +/- внутри корзины
    const { quantityChange, count } = useActualQuantity(item.product_id)
    // Если количество упало до 0, в реальном Redux товар удалится. Пока просто скроем.

    // Предполагаем, что у item внутри могут быть поля product или напрямую price/name
    // Подстраивай под свою структуру (например, item.price или item.product.price)
    const price = item.product.price;
    const name = item.product.name;
    const imgUrl = item.product.image_url;
    const volume = item.product.volume;
    const discount = item.product.discount ?? 0;


    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 select-none">
            {/* Левая часть: Картинка и Текст */}
            <div className="flex items-center gap-3 flex-1 min-w-0表">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex-shrink-0 p-2 overflow-hidden flex items-center justify-center">
                    <img
                        src={imgUrl ? BASE_URL + imgUrl : '/static/CategoryUnavailable@2x.png'}
                        alt={name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <h4 className="text-[14px] font-medium text-gray-900 leading-tight truncate">
                        {name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[14px] font-bold text-gray-900">
                            {price} ₽
                        </span>
                        {discount > 0 && (
                            <span className="text-[12px] text-gray-400 line-through">
                                {Math.round(price / (1 - discount / 100))} ₽
                            </span>
                        )}
                        <span className="text-[12px] text-gray-400">
                            · {volume || '1 л'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Правая часть: Селектор количества [- 1 +] */}
            <div className="flex items-center bg-gray-100 rounded-full h-9 px-1 gap-2.5 ml-2 flex-shrink-0">
                <button
                    onClick={() => quantityChange(false)}
                    className="w-7 h-7 hover:bg-white rounded-full flex items-center justify-center text-gray-500 font-medium text-sm transition shadow-sm bg-transparent"
                >
                    —
                </button>
                <span className="text-[14px] font-bold text-gray-900 min-w-[10px] text-center">
                    {count}
                </span>
                <button
                    onClick={() => quantityChange(true)}
                    className="w-7 h-7 hover:bg-white rounded-full flex items-center justify-center text-gray-900 font-medium text-sm transition shadow-sm bg-transparent"
                >
                    +
                </button>
            </div>
        </div>
    );
}

import { useState } from 'react';
import type { Product } from "../../../type/Food_delivery/Product";
import { BASE_URL } from '../../../RTK/Food_delivery/ProductQuery';
import { useAddToCartMutation } from '../../../RTK/Food_delivery/CartQuery';
import { useActualQuantity } from '../../../hooks/Product_delivery/userActualQuantity';

export default function ProductCard({ id, name, price, image_url, volume, discount }: Product) {
    // Локальное состояние для заглушки кнопок плюс/минус
    // Рассчитываем старую цену, если есть скидка (например, если discount = 30)
    const hasDiscount = typeof discount === 'number' && discount > 0;
    const oldPrice = hasDiscount ? Math.round(price / (1 - discount / 100)) : null;
    const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()
    const { quantityChange, count, isAuthenticated } = useActualQuantity(id)
    const [addError, setAddError] = useState<string | null>(null)

    const add = async () => {
        setAddError(null)
        if (!isAuthenticated) {
            setAddError('Войдите в аккаунт, чтобы добавить товар в корзину')
            return
        }

        try {
            await addToCart({ product_id: id }).unwrap()
        } catch {
            setAddError('Не удалось добавить товар. Попробуйте ещё раз')
        }
    }

    return (
        <div className="flex flex-col bg-white rounded-3xl p-2 w-full max-w-[210px] transition-all duration-200 select-none">

            {/* 1. КАРТИНКА, СКИДКА И УПРАВЛЕНИЕ КОЛИЧЕСТВОМ */}
            <div className="relative aspect-square w-full bg-[#F5F5F7] rounded-[24px] overflow-hidden flex items-center justify-center mb-3">
                <img
                    src={image_url ? BASE_URL + image_url : '/static/CategoryUnavailable@2x.png'}
                    alt={name}
                    className="w-full h-full object-contain p-4"
                />

                {/* Бейджик скидки (снизу слева) */}
                {hasDiscount && (
                    <div className="absolute left-2 bottom-2 bg-[#F35858] text-white text-[13px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        -{discount}%
                    </div>
                )}

                {/* Блок кнопок (снизу справа) */}
                <div className="absolute right-2 bottom-2">
                    {count === 0 ? (
                        // Если товар еще не добавлен
                        <button
                            onClick={() => add()}
                            disabled={isAdding}
                            aria-label={`Добавить ${name} в корзину`}
                            className="w-10 h-10 bg-white hover:bg-gray-50 active:scale-95 text-gray-900 rounded-full flex items-center justify-center shadow-md transition-all duration-150 text-2xl font-normal"
                        >
                            +
                        </button>
                    ) : (
                        // Если товар уже в корзине
                        <div className="flex items-center bg-white rounded-full shadow-md h-10 px-1 gap-3 transition-all duration-150">
                            <button
                                onClick={() => quantityChange(false)}
                                className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500 font-medium transition"
                            >
                                —
                            </button>
                            <span className="text-[16px] font-semibold text-gray-900 min-w-[12px] text-center">
                                {count}
                            </span>
                            <button
                                onClick={() => quantityChange(true)}
                                className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-900 font-medium transition"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. БЛОК С ЦЕНОЙ */}
            <div className="px-1 flex items-baseline gap-1.5 mb-1">
                <span className="text-[19px] font-bold text-[#E64A19] leading-none">
                    {price} ₽
                </span>
                {hasDiscount && oldPrice && (
                    <span className="text-[14px] text-gray-400 line-through leading-none">
                        {oldPrice} ₽
                    </span>
                )}
            </div>

            {/* 3. НАЗВАНИЕ И ОБЪЕМ/ВЕС */}
            <div className="px-1 flex-1 flex flex-col justify-between">
                <h4 className="text-[14px] font-medium text-gray-800 leading-tight line-clamp-2 mb-1">
                    {name}
                </h4>
                <span className="text-[13px] text-gray-400 font-normal">
                    {volume || '1 шт'}
                </span>
            </div>
            {addError && (
                <p role="alert" className="px-1 mt-2 text-xs text-red-600">
                    {addError}
                </p>
            )}
        </div >
    );
}

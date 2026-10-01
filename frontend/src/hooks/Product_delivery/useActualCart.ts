import { useEffect, useState } from "react"
import type { CartCreateResponse } from "../../type/Food_delivery/Cart"
import { useAppSelector } from "../../RTK/store"
import { useGetAllCartQuery } from "../../RTK/Food_delivery/CartQuery"

export const useActualCart = () => {
    const { data: apiData, isLoading, error } = useGetAllCartQuery();
    const sliceCartItems = useAppSelector((state) => state.cart.carts);

    // Инициализируем стейт сразу данными из кэша API, если они там уже есть
    const [actualCart, setActualCart] = useState<CartCreateResponse[]>(() => {
        return apiData?.carts || [];
    });

    // Оставляем ТОЛЬКО ОДИН эффект — для слежения за кликами в слайсе
    useEffect(() => {
        if (sliceCartItems.length === 0) return;

        const lastAddedItem = sliceCartItems[sliceCartItems.length - 1];
        if (lastAddedItem) {
            setActualCart((prev) => {
                const isExist = prev.some(item => item.id === lastAddedItem.id);
                if (isExist) {
                    return prev.map(item =>
                        item.id === lastAddedItem.id ? { ...item, ...lastAddedItem } : item
                    );
                }
                return [...prev, lastAddedItem];
            });
        }


    }, [sliceCartItems, apiData]); // Следим ТОЛЬКО за слайсом

    return { cartItems: actualCart, isLoading, error };
};
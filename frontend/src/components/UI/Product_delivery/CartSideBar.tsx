import { useState } from 'react';
import { useActualCart } from '../../../hooks/Product_delivery/useActualCart';
import CartProductCardEl from '../../Elements/Product_delivery/CartProductCardEl';

const CartSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, error, isAuthenticated, isLoading } = useActualCart();
    const items = cartItems || [];
    const itemCount = items.reduce((count, item) => count + (item.quantity || 1), 0);
    const totalSum = items.reduce((sum, item) => sum + item.product.price * (item.quantity || 1), 0);
    const isEmpty = items.length === 0;

    const contents = (
        <>
            <div className="flex items-center justify-between border-b border-gray-50 p-5">
                <div>
                    <div className="text-xl font-bold leading-tight text-gray-900">{!isEmpty && '⚡ '}25–45 мин, 0 ₽</div>
                    <p className="mt-1 text-xs text-gray-400">Доставка бесплатно, а это всегда приятно</p>
                </div>
                <button type="button" aria-label="Закрыть корзину" onClick={() => setIsOpen(false)} className="rounded-full px-2 py-1 text-2xl text-gray-400 hover:bg-gray-100 lg:hidden">×</button>
            </div>

            {!isAuthenticated ? (
                <div className="flex flex-1 items-center justify-center p-8 text-center text-gray-500">Войдите в аккаунт, чтобы пользоваться корзиной.</div>
            ) : isLoading ? (
                <div className="flex flex-1 items-center justify-center p-8 text-center text-gray-500">Загружаем корзину…</div>
            ) : error ? (
                <div role="alert" className="flex flex-1 items-center justify-center p-8 text-center text-red-600">Не удалось загрузить корзину. Попробуйте обновить страницу.</div>
            ) : isEmpty ? (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                    <img src="/static/CategoryUnavailable@2x.png" alt="Пустая корзина" className="mb-4 h-40 w-40 object-contain opacity-80" />
                    <p className="text-base font-medium leading-snug text-gray-900">В корзине пока ничего нет.<br />Самое время наполнять её!</p>
                </div>
            ) : (
                <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4">
                    {items.map((item) => <CartProductCardEl key={item.id} item={item} />)}
                </div>
            )}

            <div className="border-t border-gray-50 p-5">
                <button type="button" disabled={isEmpty || !isAuthenticated} className={`w-full rounded-2xl py-4 text-base font-bold transition ${isEmpty || !isAuthenticated ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-[#FCE000] text-gray-900 hover:bg-[#F5D500] active:scale-[0.98]'}`}>
                    {isEmpty ? 'Добавьте что-нибудь' : <>К оформлению · {totalSum.toLocaleString('ru-RU')} ₽</>}
                </button>
            </div>
        </>
    );

    return (
        <>
            <aside aria-label="Корзина" className="sticky top-0 hidden h-screen w-[340px] flex-shrink-0 flex-col border-l border-gray-100 bg-white xl:w-[380px] lg:flex">{contents}</aside>

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between rounded-2xl bg-[#FCE000] px-5 py-4 font-bold text-gray-900 shadow-lg lg:hidden"
                aria-label={`Открыть корзину, товаров: ${itemCount}`}
            >
                <span>Корзина{itemCount > 0 ? ` · ${itemCount}` : ''}</span>
                <span>{totalSum.toLocaleString('ru-RU')} ₽</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setIsOpen(false)}>
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-label="Корзина"
                        onClick={(event) => event.stopPropagation()}
                        className="absolute inset-x-0 bottom-0 flex max-h-[90dvh] min-h-[60dvh] flex-col rounded-t-3xl bg-white shadow-2xl"
                    >
                        {contents}
                    </section>
                </div>
            )}
        </>
    );
};

export default CartSidebar;

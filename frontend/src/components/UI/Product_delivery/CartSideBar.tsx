import { useActualCart } from "../../../hooks/Product_delivery/useActualCart";
import CartProductCardEl from '../../Elements/Product_delivery/CartProductCardEl';

const CartSidebar = () => {
    const { cartItems, error, isAuthenticated, isLoading } = useActualCart();

    const items = cartItems || [];
    const isEmpty = items.length === 0;

    const totalSum = items.reduce((sum, item) => sum + (item.product.price * (item.quantity || 1)), 0);

    return (
        <aside className="w-[380px] h-screen sticky top-0 bg-white border-l border-gray-100 flex flex-col hidden xl:flex">

            <div className="p-6 pb-4 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900 leading-tight flex items-center gap-1.5">
                            {/* Молния перед временем, как на твоем активном скрине */}
                            {!isEmpty && <span className="text-purple-600">⚡</span>}
                            25–45 мин, 0 ₽
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                            Доставка бесплатно, а это всегда приятно
                        </span>
                    </div>

                    <button className="text-gray-300 hover:text-gray-500 transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Центральная часть: Динамический контент */}
            {!isAuthenticated ? (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-500">
                    Войдите в аккаунт, чтобы пользоваться корзиной.
                </div>
            ) : isLoading ? (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-500">
                    Загружаем корзину…
                </div>
            ) : error ? (
                <div role="alert" className="flex-1 flex items-center justify-center p-8 text-center text-red-600">
                    Не удалось загрузить корзину. Попробуйте обновить страницу.
                </div>
            ) : isEmpty ? (
                // СОСТОЯНИЕ: Корзина ПУСТАЯ (Центрируем контент)
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-48 h-48 flex items-center justify-center mb-4">
                        <img
                            src="/static/CategoryUnavailable@2x.png"
                            alt="Пустая корзина"
                            className="w-full h-full object-contain opacity-80"
                        />
                    </div>
                    <p className="text-[16px] font-medium text-gray-900 leading-snug">
                        В корзине пока ничего нет.<br />
                        Самое время наполнять её!
                    </p>
                </div>
            ) : (
                // СОСТОЯНИЕ: В корзине ЕСТЬ ТОВАРЫ (Выстраиваем список сверху вниз с прокруткой)
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1">
                    {items.map((item) => (
                        <CartProductCardEl key={item.id} item={item} />
                    ))}
                </div>
            )}

            {/* Нижняя часть: Динамическая кнопка действия */}
            <div className="p-6 border-t border-gray-50">
                <button
                    disabled={isEmpty}
                    className={`
                        w-full py-4 rounded-2xl text-[16px] font-bold transition-all duration-200 flex items-center justify-center gap-1.5
                        ${isEmpty
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#FCE000] text-gray-900 hover:bg-[#F5D500] active:scale-[0.98] shadow-sm'}
                    `}
                >
                    {isEmpty ? (
                        'Добавьте что-нибудь'
                    ) : (
                        <>
                            <span>В корзину</span>
                            <span className="opacity-30">·</span>
                            <span>{totalSum} ₽</span>
                        </>
                    )}
                </button>
            </div>

        </aside>
    );
};

export default CartSidebar;

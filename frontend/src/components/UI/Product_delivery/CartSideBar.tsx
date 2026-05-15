
const CartSidebar = ({ cartItems = [] }) => {
    const isEmpty = cartItems.length === 0;

    return (
        <aside className="w-[380px] h-screen sticky top-0 bg-white border-l border-gray-100 flex flex-col hidden xl:flex">
            {/* Верхняя часть: Время и доставка */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900 leading-tight">
                            25–50 мин, 0 ₽
                        </span>
                        <span className="text-sm text-gray-400 mt-1">
                            Доставка бесплатно, а это всегда приятно
                        </span>
                    </div>
                    {/* Иконка инфо */}
                    <button className="text-gray-300 hover:text-gray-500 transition">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Центральная часть: Состояние корзины */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                {isEmpty ? (
                    <>
                        {/* Иконка пустого пакета (упрощенная версия твоего скрина) */}
                        <div className="w-32 h-32 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                            <div className="relative w-16 h-20 border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center">
                                <div className="flex gap-1 mb-2">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                </div>
                                <div className="w-6 h-0.5 bg-gray-300"></div>
                            </div>
                        </div>
                        <p className="text-[17px] font-medium text-gray-900 leading-snug">
                            В корзине пока ничего нет.<br />
                            Самое время наполнять её!
                        </p>
                    </>
                ) : (
                    <div className="w-full text-left">
                        {/* Тут будет список товаров, если корзина не пуста */}
                        <p>Товары в корзине...</p>
                    </div>
                )}
            </div>

            {/* Нижняя часть: Кнопка действия */}
            <div className="p-6">
                <button
                    disabled={isEmpty}
                    className={`
                        w-full py-4 rounded-2xl text-[17px] font-semibold transition-all duration-200
                        ${isEmpty
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 active:scale-95'}
                    `}
                >
                    {isEmpty ? 'Добавьте что-нибудь' : 'Перейти к оформлению'}
                </button>
            </div>
        </aside>
    );
};

export default CartSidebar;
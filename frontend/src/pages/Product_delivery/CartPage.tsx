import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useActualCart } from '../../hooks/Product_delivery/useActualCart';
import { useClearCartMutation, useCreateOrderMutation } from '../../RTK/Food_delivery/CartQuery';
import CartProductCardEl from '../../components/Elements/Product_delivery/CartProductCardEl';

const money = (value: number) => `${Math.round(value).toLocaleString('ru-RU')} ₽`;

export default function CartPage() {
    const { cartItems, isAuthenticated, isLoading, error } = useActualCart();
    const [clearCart, { isLoading: isClearing }] = useClearCartMutation();
    const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();
    const [address, setAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [deliveryWindow, setDeliveryWindow] = useState('20–50 минут');
    const [comment, setComment] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [createdOrder, setCreatedOrder] = useState<{ id: number; total: number } | null>(null);

    const items = cartItems ?? [];
    const totals = useMemo(() => items.reduce((result, item) => {
        const quantity = item.quantity || 1;
        const price = item.product.price;
        const discount = item.product.discount ?? 0;
        const oldPrice = discount > 0 && discount < 100 ? Math.round(price / (1 - discount / 100)) : price;
        result.current += price * quantity;
        result.subtotal += oldPrice * quantity;
        return result;
    }, { current: 0, subtotal: 0 }), [items]);
    const discountTotal = totals.subtotal - totals.current;

    const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError('');
        try {
            const order = await createOrder({
                delivery_address: address,
                customer_phone: customerPhone,
                delivery_window: deliveryWindow,
                comment,
            }).unwrap();
            setCreatedOrder({ id: order.id, total: order.total });
        } catch {
            setSubmitError('Не получилось оформить заказ. Обнови корзину и попробуй ещё раз.');
        }
    };

    if (createdOrder) {
        return (
            <main className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
                <h1 className="text-4xl font-extrabold text-gray-950">Заказ оформлен</h1>
                <p className="mt-3 text-lg text-gray-600">Заказ №{createdOrder.id} на сумму {money(createdOrder.total)} сохранён.</p>
                <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">Это демо-проект: онлайн-оплата и реальная доставка пока не подключены.</p>
                <Link to="/food_delivery" className="mt-8 inline-flex rounded-2xl bg-[#FCE000] px-8 py-4 font-bold text-gray-950">Вернуться в каталог</Link>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12">
            <Link to="/food_delivery" className="inline-flex items-center gap-2 text-base text-gray-400 transition hover:text-gray-900">← <span>Вернуться в каталог</span></Link>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-950 sm:text-6xl">Корзина</h1>
                {items.length > 0 && isAuthenticated && (
                    <button type="button" onClick={() => void clearCart()} disabled={isClearing} className="rounded-2xl bg-gray-100 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-200 disabled:opacity-50">
                        {isClearing ? 'Очищаем…' : 'Очистить корзину'}
                    </button>
                )}
            </div>

            {!isAuthenticated ? (
                <div className="mt-10 rounded-3xl bg-gray-50 p-8 text-center text-gray-600">Войди в аккаунт, чтобы увидеть корзину и оформить заказ.</div>
            ) : isLoading ? (
                <div className="mt-10 rounded-3xl bg-gray-50 p-8 text-center text-gray-600">Загружаем корзину…</div>
            ) : error ? (
                <div role="alert" className="mt-10 rounded-3xl bg-red-50 p-8 text-center text-red-700">Не удалось загрузить корзину. Попробуй обновить страницу.</div>
            ) : items.length === 0 ? (
                <div className="mt-10 rounded-3xl bg-gray-50 p-10 text-center">
                    <p className="text-xl font-semibold text-gray-900">Корзина пока пустая</p>
                    <Link to="/food_delivery" className="mt-5 inline-flex rounded-2xl bg-[#FCE000] px-6 py-3 font-bold text-gray-950">Перейти в каталог</Link>
                </div>
            ) : (
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.75fr)] lg:gap-14">
                    <section aria-label="Товары в корзине" className="min-w-0">
                        <div className="mb-5 rounded-3xl bg-[#F7F6F4] px-6 py-5">
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-950"><span className="text-purple-600">⚡</span> Доставка 0 ₽</div>
                            <p className="mt-1 text-gray-500">А это всегда приятно</p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {items.map((item) => <CartProductCardEl key={item.id} item={item} />)}
                        </div>
                    </section>

                    <section className="h-fit rounded-3xl bg-white lg:sticky lg:top-6">
                        <h2 className="text-3xl font-extrabold text-gray-950">Итого</h2>
                        <p className="mt-1 text-lg">Доставка <span className="text-purple-600">⚡ 20–50 мин</span></p>
                        <div className="my-5 border-t border-gray-200" />
                        <dl className="space-y-4 text-base sm:text-lg">
                            <div className="flex justify-between gap-4"><dt>Товары</dt><dd className="font-semibold">{money(totals.subtotal)}</dd></div>
                            {discountTotal > 0.5 && <div className="flex justify-between gap-4"><dt>Скидки</dt><dd className="font-semibold text-[#F35848]">−{money(discountTotal)}</dd></div>}
                            <div className="flex justify-between gap-4"><dt>Доставка</dt><dd className="font-semibold">0 ₽</dd></div>
                        </dl>
                        <div className="my-5 border-t border-gray-200" />
                        <div className="flex justify-between gap-4 text-2xl font-bold"><span>К оплате</span><span>{money(totals.current)}</span></div>

                        <form onSubmit={submitOrder} className="mt-6 space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Адрес доставки
                                <input required minLength={5} maxLength={500} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Улица, дом, квартира" className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-yellow-400" />
                            </label>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Телефон
                                    <input required minLength={5} maxLength={30} type="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="+7 700 000 00 00" className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-yellow-400" />
                                </label>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Время доставки
                                    <select value={deliveryWindow} onChange={(event) => setDeliveryWindow(event.target.value)} className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-normal outline-none focus:border-yellow-400">
                                        <option>20–50 минут</option>
                                        <option>Как можно скорее</option>
                                    </select>
                                </label>
                            </div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Комментарий к заказу <span className="font-normal text-gray-400">(необязательно)</span>
                                <textarea maxLength={1000} value={comment} onChange={(event) => setComment(event.target.value)} rows={2} placeholder="Домофон, подъезд и другие детали" className="mt-2 w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 font-normal outline-none transition focus:border-yellow-400" />
                            </label>
                            {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full rounded-3xl bg-[#FCE000] px-6 py-5 text-lg font-bold text-gray-950 transition hover:bg-[#F5D500] disabled:cursor-wait disabled:opacity-60">
                                {isSubmitting ? 'Оформляем заказ…' : 'Оформить заказ'}
                            </button>
                            <p className="text-center text-xs text-gray-400">Оплата онлайн пока не подключена. Заказ сохранится в демо-системе.</p>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export interface OrderCreateRequest {
    delivery_address: string;
    customer_phone: string;
    delivery_window: string;
    comment?: string;
}

export interface OrderResponse {
    id: number;
    status: string;
    delivery_address: string;
    customer_phone: string;
    delivery_window: string;
    items: Array<{
        product_id: number;
        name: string;
        image_url: string | null;
        volume: string;
        quantity: number;
        unit_price: number;
        discount_percent: number;
    }>;
    subtotal: number;
    discount_total: number;
    delivery_fee: number;
    total: number;
    created_at: string;
}

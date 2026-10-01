import type { Product } from "./Product"

export interface CartCreateRequest {
    product_id: number
}

export interface CartCreateResponse extends CartCreateRequest {
    product_id: number
    id: number
    quantity: number
    product: Product
}


export interface AllCartResponse {
    carts: CartCreateResponse[]
}

export interface QuantityChangeRequest {
    id: number
    operand: boolean
}

export interface QuantityChangeResponse {
    id?: number
    quantity?: number
    message?: string
}
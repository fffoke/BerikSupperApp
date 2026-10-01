import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
    CartCreateResponse, AllCartResponse,
    QuantityChangeResponse
} from "../../type/Food_delivery/Cart";

const initialCart: AllCartResponse = {
    carts: [
        {
            product_id: 0,
            id: 0,
            quantity: 0,
            product: {
                id: 0,
                name: '',
                price: 0,
                image_url: '',
                volume: '',
                discount: 0
            }
        }
    ]
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addCart(state, action: PayloadAction<CartCreateResponse>) {
            state.carts.push(action.payload)
        },
        updateQuantity(state, action: PayloadAction<QuantityChangeResponse>) {
            const cart = state.carts.find((c) => c.id == action.payload.id)
            if (cart && typeof action.payload.quantity !== 'undefined') {
                cart.quantity = action.payload.quantity
                console.log(`Изменил кол-во`)
            } else {
                state.carts = state.carts.filter((c) => c.id !== action.payload.id)
            }
        }
    },
})

export const { addCart, updateQuantity } = CartSlice.actions
export default CartSlice.reducer
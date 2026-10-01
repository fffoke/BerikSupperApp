import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./ProductQuery";
import { type RootState } from '../store'

import type {
    CartCreateResponse, AllCartResponse,
    QuantityChangeRequest, QuantityChangeResponse,
    CartCreateRequest
} from "../../type/Food_delivery/Cart";
import type { OrderCreateRequest, OrderResponse } from "../../type/Food_delivery/Order";


export const CartApi = createApi({
    reducerPath: 'CartApi',
    tagTypes: ['Cart'],

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const auth = state.auth.auth

            if (auth.is_auth && auth.access) {
                headers.set('authorization', `Bearer ${auth.access}`)
            }

            return headers
        },
    }),

    endpoints: (builder) => ({
        addToCart: builder.mutation<CartCreateResponse, CartCreateRequest>({
            query: (body) => ({
            url: 'api/v1/cart/',
            method: 'POST',
            body
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),

        updateQuantity: builder.mutation<QuantityChangeResponse, QuantityChangeRequest>({
            query: (body) => ({
                url: 'api/v1/cart/change_quantity',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),

        getAllCart: builder.query<AllCartResponse, void>({
            query: () => 'api/v1/cart/get_all',
            providesTags: [{ type: 'Cart', id: 'LIST' }],
        }),

        clearCart: builder.mutation<void, void>({
            query: () => ({ url: 'api/v1/cart/clear', method: 'DELETE' }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),

        createOrder: builder.mutation<OrderResponse, OrderCreateRequest>({
            query: (body) => ({ url: 'api/v1/order/', method: 'POST', body }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
        }),

    })

})

export const {
    useGetAllCartQuery,
    useUpdateQuantityMutation,
    useAddToCartMutation,
    useClearCartMutation,
    useCreateOrderMutation,
} = CartApi

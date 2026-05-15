import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ParentCategoryResponse, ProductDetail } from "../../type/Food_delivery/Product";

export const BASE_URL = 'http://127.0.0.1:8000'

export const ProductApi = createApi({
    reducerPath: 'ProductApi',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + '/'
    }),

    endpoints: (builder) => ({

        getCatalog: builder.query<ParentCategoryResponse, void>({
            query: () => 'api/v1/category/get_catalog'
        }),

        getParentCategory: builder.query<ParentCategoryResponse, number>({
            query: (id) => `api/v1/category/get_category_parent/${id}`
        }),

        getProductById: builder.query<ProductDetail, number>({
            query: (id) => `api/v1/product/${id}`
        }),

        getProductsBySlag: builder.query<ProductDetail[], string>({
            query: (slug) => `/slug/${slug}`
        }),

        getAllParentProduct: builder.query<ProductDetail[], number>({
            query: (parent_id) => `/parent/${parent_id}`
        })
    })

})

export const {
    useGetAllParentProductQuery,
    useGetCatalogQuery,
    useGetParentCategoryQuery,
    useGetProductByIdQuery,
    useGetProductsBySlagQuery,
} = ProductApi
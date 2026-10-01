import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoryProductsResponse, ParentCategoryResponse, ProductDetail } from "../../type/Food_delivery/Product";

export const BASE_URL = ''

export const ProductApi = createApi({
    reducerPath: 'ProductApi',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + '/'
    }),

    endpoints: (builder) => ({

        getCatalog: builder.query<ParentCategoryResponse, void>({
            query: () => 'api/v1/category/get_catalog'
        }),

        getParentCategory: builder.query<ParentCategoryResponse, string>({
            query: (slug) => `api/v1/category/get_category_parent/${slug}`
        }),

        getProductById: builder.query<ProductDetail, number>({
            query: (id) => `api/v1/product/${id}`
        }),

        getProductsBySlag: builder.query<ProductDetail[], string>({
            query: (slug) => `api/v1/product/slug/${slug}`
        }),

        getAllParentProduct: builder.query<CategoryProductsResponse[], string>({
            query: (slug) => `api/v1/product/parent/${slug}`
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

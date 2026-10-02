import { createApi } from "@reduxjs/toolkit/query/react";
import type { CategoryProductsResponse, ParentCategoryResponse, ProductDetail, ProductListResponse } from "../../type/Food_delivery/Product";
import { authenticatedBaseQuery } from "../authenticatedBaseQuery";

export const BASE_URL = ''

export const ProductApi = createApi({
    reducerPath: 'ProductApi',

    baseQuery: authenticatedBaseQuery,

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

        getProductsBySlag: builder.query<ProductListResponse, string>({
            query: (slug) => `api/v1/product/slug/${slug}`
        }),

        getAllParentProduct: builder.query<CategoryProductsResponse[], string>({
            query: (slug) => `api/v1/product/parent/${slug}`
        }),

        searchProducts: builder.query<ProductListResponse, string>({
            query: (query) => `api/v1/product/search?q=${encodeURIComponent(query)}`
        })
    })

})

export const {
    useGetAllParentProductQuery,
    useGetCatalogQuery,
    useGetParentCategoryQuery,
    useGetProductByIdQuery,
    useGetProductsBySlagQuery,
    useSearchProductsQuery,
} = ProductApi

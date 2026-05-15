import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '../store'

import type { UserReg, TokenResponse, MeResponse, UserLogin } from '../../type/Auth'
import { SetTokens } from './AuthSlice'


export const AuthApi = createApi({
    reducerPath: 'AuthApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
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
        getMe: builder.query<MeResponse, void>({
            query: () => 'api/v1/auth/me'
        }),
        postRegister: builder.mutation<TokenResponse, UserReg>({
            query: (body) => ({
                url: 'api/v1/auth/register',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(SetTokens(data))

                    dispatch(AuthApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
                } catch (e) {
                    console.log(e)
                }
            }

        }),
        postLogin: builder.mutation<TokenResponse, UserLogin>({
            query: (body) => ({
                url: 'api/v1/auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(SetTokens(data))
                    dispatch(AuthApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
                } catch (e) {
                    console.log(e)
                }
            }

        })
    })
})


export const { useGetMeQuery, usePostRegisterMutation, usePostLoginMutation } = AuthApi 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '../store'

import type {
    UserReg, TokenResponse,
    MeResponse, UserLogin,
    AvatarUploadResponse
} from '../../type/Auth'
import { setMe, SetTokens } from './AuthSlice'


export const AuthApi = createApi({
    reducerPath: 'AuthApi',

    baseQuery: fetchBaseQuery({
        baseUrl: '/',
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
            query: () => 'api/v1/auth/me',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(setMe(data))

                } catch (e) {
                    console.log(e)
                }
            }
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

        }),

        uploadAvatar: builder.mutation<AvatarUploadResponse, File>({
            query: (file) => {

                const form = new FormData()
                form.append('file', file)


                return ({
                    url: 'api/v1/upload/avatar',
                    method: 'POST',
                    body: form
                })
            }
        })
    })
})


export const {
    useGetMeQuery, usePostRegisterMutation,
    usePostLoginMutation, useUploadAvatarMutation
} = AuthApi 

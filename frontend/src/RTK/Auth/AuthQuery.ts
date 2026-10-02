import { createApi } from '@reduxjs/toolkit/query/react'
import { authenticatedBaseQuery } from '../authenticatedBaseQuery'

import type {
    UserReg, TokenResponse,
    MeResponse, UserLogin,
    AvatarUploadResponse
} from '../../type/Auth'
import { setMe } from './AuthSlice'


export const AuthApi = createApi({
    reducerPath: 'AuthApi',

    baseQuery: authenticatedBaseQuery,

    endpoints: (builder) => ({
        getMe: builder.query<MeResponse, void>({
            query: () => 'api/v1/auth/me',
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    dispatch(setMe(data))

                } catch { /* The route guard handles an invalid session. */ }
            }
        }),
        postRegister: builder.mutation<TokenResponse, UserReg>({
            query: (body) => ({
                url: 'api/v1/auth/register',
                method: 'POST',
                body,
            }),
        }),
        postLogin: builder.mutation<TokenResponse, UserLogin>({
            query: (body) => ({
                url: 'api/v1/auth/login',
                method: 'POST',
                body,
            }),
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

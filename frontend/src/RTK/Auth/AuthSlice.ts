import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Auth, TokenResponse, MeResponse } from "../../type/Auth";
import { AuthApi } from "./AuthQuery";





const initialAuth: { auth: Auth } = {
    auth: {
        is_auth: false,
        access: null,
        refresh: null,
        me: {
            full_name: '',
            email: '',
            avatar_url: '',
            role: '',
            id: 0
        }
    }
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: initialAuth,
    reducers: {
        SetTokens(state, action: PayloadAction<TokenResponse>) {
            state.auth.access = action.payload.access_token
            state.auth.refresh = action.payload.refresh_token
            state.auth.is_auth = true
        },
        setMe(state, action: PayloadAction<MeResponse>) {
            console.log(`Данные пришли в SetMe${action.payload}`)
            state.auth.me.full_name = action.payload.full_name
            state.auth.me.role = action.payload.role
            state.auth.me.avatar_url = action.payload.avatar_url
            state.auth.me.email = action.payload.email
            state.auth.me.id = action.payload.id
        },
        clearAll(state) {
            state.auth.access = ''
            state.auth.is_auth = false
            state.auth.refresh = ''
            state.auth.me.full_name = ''
            state.auth.me.role = ''
            state.auth.me.avatar_url = ''
            state.auth.me.email = ''
            state.auth.me.id = null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            AuthApi.endpoints.postRegister.matchFulfilled,
            (state, action) => {
                if (action.payload.access_token && action.payload.refresh_token) {
                    // state.auth.is_auth = true
                    // state.auth.access = action.payload.access_token
                    // state.auth.refresh = action.payload.refresh_token
                    SetTokens(action.payload)
                }
            }
        );

        builder.addMatcher(
            AuthApi.endpoints.postLogin.matchFulfilled,
            (state, action) => {
                if (action.payload.access_token && action.payload.refresh_token) {
                    // state.auth.is_auth = true
                    // state.auth.access = action.payload.access_token
                    // state.auth.refresh = action.payload.refresh_token
                    SetTokens(action.payload)
                }
            }
        );

        builder.addMatcher(
            AuthApi.endpoints.getMe.matchFulfilled,
            (state, action) => {
                state.auth.me.full_name = action.payload.full_name
                state.auth.me.role = action.payload.role
                state.auth.me.avatar_url = action.payload.avatar_url
                state.auth.me.email = action.payload.email
                state.auth.me.id = action.payload.id
            }
        )
    },
})

export const { SetTokens, setMe, clearAll } = AuthSlice.actions
export default AuthSlice.reducer




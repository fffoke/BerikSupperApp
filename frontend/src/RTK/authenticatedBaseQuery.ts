import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearAll, SetTokens } from './Auth/AuthSlice';
import type { RootState } from './store';
import type { TokenResponse } from '../type/Auth';

const baseQuery = fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
        const access = (getState() as RootState).auth.auth.access;
        if (access) headers.set('authorization', `Bearer ${access}`);
        return headers;
    },
});

export const authenticatedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const url = typeof args === 'string' ? args : args.url;
    if (result.error?.status !== 401 || (url.startsWith('api/v1/auth/') && url !== 'api/v1/auth/me')) return result;

    const refresh = (api.getState() as RootState).auth.auth.refresh;
    if (!refresh) return result;

    const refreshed = await baseQuery({
        url: 'api/v1/auth/refresh',
        method: 'POST',
        body: { refresh_token: refresh },
    }, api, extraOptions);
    const tokens = refreshed.data as TokenResponse | undefined;
    if (!tokens?.access_token || !tokens.refresh_token) {
        api.dispatch(clearAll());
        return result;
    }

    api.dispatch(SetTokens(tokens));
    result = await baseQuery(args, api, extraOptions);
    return result;
};

import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery } from '../RTK/Auth/AuthQuery';
import { clearAll } from '../RTK/Auth/AuthSlice';
import { useAppDispatch, useAppSelector } from '../RTK/store';

export default function RequireAuth() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth.auth);
    const location = useLocation();
    const { data, error, isFetching, isUninitialized, refetch } = useGetMeQuery(undefined, {
        skip: !auth.is_auth || !auth.access,
        refetchOnMountOrArgChange: true,
    });
    const sessionExpired = error && 'status' in error && error.status === 401;

    useEffect(() => {
        if (sessionExpired) dispatch(clearAll());
    }, [dispatch, sessionExpired]);

    if (!auth.is_auth || !auth.access || sessionExpired) {
        return <Navigate to="/" replace state={{ authRequired: true, from: `${location.pathname}${location.search}${location.hash}` }} />;
    }

    if (error) {
        return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-slate-700"><p>Не удалось проверить вход.</p><button type="button" onClick={() => refetch()} className="rounded-xl bg-[#fce000] px-5 py-3 font-semibold text-slate-950">Повторить</button></div>;
    }

    if (isFetching || isUninitialized || !data) {
        return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">Проверяем вход…</div>;
    }

    return <Outlet />;
}

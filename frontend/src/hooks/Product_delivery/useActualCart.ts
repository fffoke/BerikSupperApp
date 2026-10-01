import { useAppSelector } from "../../RTK/store"
import { useGetAllCartQuery } from "../../RTK/Food_delivery/CartQuery"

export const useActualCart = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.auth.is_auth);
    const { data, isLoading, error } = useGetAllCartQuery(undefined, {
        skip: !isAuthenticated,
    });

    return {
        cartItems: isAuthenticated ? data?.carts ?? [] : [],
        isLoading,
        error,
        isAuthenticated,
    };
};

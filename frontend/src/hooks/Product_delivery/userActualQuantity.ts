import { useActualCart } from "./useActualCart"
import { useUpdateQuantityMutation } from "../../RTK/Food_delivery/CartQuery"

export const useActualQuantity = (productId: number) => {
    const { cartItems, isAuthenticated } = useActualCart()
    const cartItem = cartItems.find((item) => item.product_id === productId)
    const [updateQuantity] = useUpdateQuantityMutation()

    const quantityChange = async (operand: boolean) => {
        if (cartItem) {
            try {
                await updateQuantity({ id: cartItem.id, operand }).unwrap()
            } catch {
                // The cart query remains unchanged when the server rejects the update.
            }
        }
    }

    return { quantityChange, count: cartItem?.quantity ?? 0, isAuthenticated };
}

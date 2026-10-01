import { useState } from "react"
import { useAppSelector } from "../../RTK/store"
import { useUpdateQuantityMutation } from "../../RTK/Food_delivery/CartQuery"



export const useActualQuantity = (id: number) => {
    const actual = useAppSelector((state) => state.cart.carts)
    const [count, setCount] = useState<number>(() => {
        const product = actual.find((el) => el.id === id)

        return product?.quantity ? product.quantity : 0
    })
    const [updateQuantity] = useUpdateQuantityMutation()

    const quantityChange = (operand: boolean) => {

        if (id !== null) {
            updateQuantity({
                id: id,
                operand: operand
            })
        }
    }
    return { quantityChange, count, setCount }
}
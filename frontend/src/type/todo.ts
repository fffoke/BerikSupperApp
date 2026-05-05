export type Todo = {
    userId: number
    id: number
    title: string
    description: string
    date: string
    completed: boolean
}

export type TodoEdit = {
    title?: string
    description?: string
}


export type TodoEditPayload = {
    id: number
    title?: string
    description?: string
}

export type TodoAddPayload = {
    title: string
    description: string
}

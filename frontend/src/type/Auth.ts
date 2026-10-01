import type { User } from "./User"

export interface UserReg {
    email?: string
    password: string
    full_name: string
    phone: string
    avatar_url?: string
}




export interface Auth {
    is_auth: boolean
    access: string | null
    refresh: string | null
    me: User
}


export interface TokenResponse {
    access_token: string
    refresh_token: string
    token_type: string
}

export interface MeResponse {
    id: number
    email?: string
    full_name: string
    role: string
    avatar_url?: string
}


export interface UserLogin {
    full_name: string
    password: string
}


export interface AvatarUploadResponse {
    image_url: string
}
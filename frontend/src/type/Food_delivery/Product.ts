
export interface CategoryResponse {
    image_url: string,
    name: string,
    parent_id: number | null
    slug: string,
    id: number,
}

export interface ParentCategoryResponse {
    categorys: CategoryResponse[]
}



export interface ProductDetail {
    id: number,
    name: string,
    price: number,
    expiration: string,
    conditions: string,
    brnad: string,
    manufacturer: string,
    calories: number,
    proteins: number,
    fats: number,
    carbs: number,
    img_url: string,
    category_id: number,
    volume: string
}

export interface Product {
    id: number,
    name: string,
    price: number,
    img_url: string,
    volume: string
}
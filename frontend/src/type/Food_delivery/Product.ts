
export interface CategoryResponse {
    image_url: string,
    name: string,
    parent_id: number,
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
    image_url: string,
    category_id: number,
    volume: string
}

export interface Product {
    id: number,
    name: string,
    price: number,
    image_url: string,
    volume: string
    discount: number
}


export interface CategoryProductsResponse {
    category_name: string,

    products: Product[]
}

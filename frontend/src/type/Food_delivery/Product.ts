
export interface CategoryResponse {
    image_url: string | null,
    name: string,
    parent_id: number | null,
    slug: string,
    id: number,
    children: CategoryResponse[],
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
    brand: string | null,
    manufacturer: string | null,
    calories: number,
    proteins: number,
    fats: number,
    carbs: number,
    image_url: string | null,
    category_id: number,
    volume: string
}

export interface Product {
    id: number,
    name: string,
    price: number,
    image_url: string | null,
    volume: string
    discount: number | null
}


export interface CategoryProductsResponse {
    category_name: string,

    products: Product[]
}

export interface ProductListResponse {
    products: Product[]
}

import axios from "axios";
import { useQuery } from "react-query";


export async function featuredProduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}


export async function featuredCategory() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
export async function featuredBrand() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}

export async function featuredSingleProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}
export async function featuredSubCategory(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
}

export async function featuredSingelBrand(id) {
    
     return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
}






export async function featuredSingelCategory(id) {
    
     return     axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
   
}


export function useProduct(key, fn) {
    return useQuery(key, fn,
        {
            select: (data) => data.data.data,
        })
}

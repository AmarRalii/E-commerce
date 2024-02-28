import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";


let token = localStorage.getItem('userToken')

export function addToCart(productId) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, { productId }, {
        headers: {
            token
        }
    })
}


export function deleteCart(productId) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        headers: {
            token
        }
    })
}
export function updateCart({id,count}) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count}, {
        headers: {
            token
        }
    })
}

//paymenr

export function checkout({id,shippingAddress}) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{shippingAddress}, {
        headers: {
            token
        }
    })
}





export function getCart() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers: {
            token
        }
    })
}




export function useGetCart(key, fn) {

    return useQuery(key, fn)
}


export function useCrudCart(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: (data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getCart')
        },
        onError: (data) => { toast.error(data?.message) }
    })
}


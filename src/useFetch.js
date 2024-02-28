import axios from "axios";
import {  useState } from "react";

export function useFetch(url) {

    let [arr, setData] = useState([])
    async function getData() {
        let { data } = await axios.get(url)
        setData(data?.data)
    }
    getData()
    return arr

}


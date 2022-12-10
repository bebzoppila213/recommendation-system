import axios from "axios";
import { useEffect, useState } from "react";




export default function useFetch<T extends Object, U extends Object>(defaultState: T, defaultParams: U, url: string){
    const [allData, setAllData] = useState<T>(defaultState)
    const [apiParams, setApiParams] = useState<U>(defaultParams)


    function updateApiParams<M>(key: keyof U, value: M){
        setApiParams({...apiParams, [key]: value})
    }

    const loadData = async () => {
        const response = await axios.get<T>(url, {params: apiParams})
        setAllData(response.data)
    }

    useEffect(() => {
        loadData()
    },[apiParams])

    return{
        allData,
        updateApiParams,
        apiParams
    }

}
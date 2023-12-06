import { useEffect, useState } from "react"
import { MENU_API, corsproxy } from '../utils/constants';


const useRestaurantMenu = (resId) => {
    // debugger
    const [resInfo, setResInfo] = useState(null)

    useEffect(()=>{

        fetchData();
    }, [])
    fetchData = async()=>{
        const data = await fetch(corsproxy + MENU_API + resId)
        const json = await data.json();

        setResInfo(json?.data)
    }

    return resInfo;
}

export default useRestaurantMenu;
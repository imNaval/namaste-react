import { useEffect, useState } from "react"
import { MENU_API, corsproxy, SERVER_URL } from '../utils/constants';
import { useSelector } from "react-redux";


const useRestaurantMenu = (resId) => {
    // debugger
    const [resInfo, setResInfo] = useState(null)

    const {latitude, longitude} = useSelector(store => store.user)

    useEffect(()=>{

        fetchData();
    }, [])
    const fetchData = async()=>{
        // const data = await fetch(corsproxy + MENU_API + resId)
        const data = await fetch(`${SERVER_URL}/api/swiggy/getMenu?lat=${latitude}&lng=${longitude}&restaurantId=${resId}`)

        const json = await data.json();

        setResInfo(json?.data)
    }

    return resInfo;
}

export default useRestaurantMenu;
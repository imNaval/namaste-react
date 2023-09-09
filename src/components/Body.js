import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { restaurantData } from "../utils/mockData";
import { SWIGGY_API } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [resLists, setResLists] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch(SWIGGY_API);

        const json = await data.json();
        // console.log(json);

        setResLists(json?.data?.cards[2]?.card?.card.gridElements?.infoWithStyle?.restaurants);
        setFilteredList(json?.data?.cards[2]?.card?.card.gridElements?.infoWithStyle?.restaurants);
        // setFilteredList(resLists)  //why this will not work?
    }
    // console.log(filteredList)
    // console.log("body render");

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) return <>
        <h1>It's look like you are offline!!!</h1>
        <p>Please check your network connectivity...</p>
    </>
    return (
        resLists?.length === 0 ? <Shimmer />
        :
        <div className="body mt-44">
            <div className="filter m-4 p-4 flex justify-center">
                <input type="text" className="p-2 m-4 border-2 border-solid border-black" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                <button className="px-4 py-2 my-4 bg-green-100 rounded-lg" onClick={()=>{
                    const filteredRes = resLists?.filter((res) => (res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) || res?.info?.cuisines.join(',').toLowerCase().includes(searchText.toLowerCase()) ));
                    setFilteredList(filteredRes)
                    // setResLists(filteredRes)
                }} >search</button>
                <button className="px-4 py-2 my-4 mx-8 bg-gray-100 rounded-lg" onClick={() => {
                    setFilteredList(restaurantData.filter(resData => resData?.info?.avgRating > 4))
                }}>Top Rated Restaurants</button>
            </div>

            <div className="flex flex-wrap justify-center">
                {
                    //filteredList?.map(restaurant => <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />)
                    filteredList?.map(restaurant => <Link style={{ color: "black", textDecoration: 'none'}} key={restaurant?.info?.id} to={"/restaurant/"+restaurant?.info?.id}>
                        <RestaurantCard resData={restaurant} />
                    </Link>)
                }
            </div>
        </div>
    )
}

export default Body
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { restaurantData } from "../utils/mockData";
import { SWIGGY_API } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    return (
        resLists?.length === 0 ? <Shimmer />
        :
        <div className="body">
            <div className="filter">
                <input type="text" className="search-input" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                <button className="search-btn" onClick={()=>{
                    const filteredRes = resLists?.filter((res) => (res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) || res?.info?.cuisines.join(',').toLowerCase().includes(searchText.toLowerCase()) ));
                    setFilteredList(filteredRes)
                    // setResLists(filteredRes)
                }} >search</button>
                <button className="top-rated" onClick={() => {
                    setFilteredList(restaurantData.filter(resData => resData?.info?.avgRating > 4))
                }}>Top Rated Restaurants</button>
            </div>

            <div className="res-container">
                {
                    //filteredList?.map(restaurant => <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />)
                    filteredList?.map(restaurant => <Link key={restaurant?.info?.id} to={"/restaurant/"+restaurant?.info?.id}><RestaurantCard resData={restaurant} /></Link>)
                }
            </div>
        </div>
    )
}

export default Body
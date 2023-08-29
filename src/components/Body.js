import RestaurantCard from "./RestaurantCard";
import { restaurantData } from "../utils/mockData";
import { useState } from "react";

const Body = () => {
    const [resLists, setResLists] = useState(restaurantData)
    return (
        <div className="body">
            <div className="filter">
                <input className="search-input" />
                <button className="search-btn" >search</button>
                <button className="top-rated" onClick={()=>{
                    setResLists(restaurantData.filter(resData => resData.info.avgRating > 4))
                }}>Top Rated Restaurants</button>
            </div>

            <div className="res-container">
                {
                    resLists.map(restaurant => <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />)
                }
            </div>
        </div>
    )
}

export default Body
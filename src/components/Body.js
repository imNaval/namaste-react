import RestaurantCard, { withOfferLabel, withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { restaurantData } from "../utils/mockData";
import { SWIGGY_API, corsproxy, payload } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import RestaurantMiniCard from "./RestaurantMiniCard";
import Recipes from "./Recipes";
import Carousel from "./Carousel";
import getRestaurantList from "../utils/getRestaurantList";
import checkIt from "./CheckIt";
import DataFooter from "./DataFooter";

const Body = () => {

    // const { loggedInUser, setUserName } = useContext(UserContext)

    const [resLists, setResLists] = useState([])
    const [searchText, setSearchText] = useState("")
    const [filteredList, setFilteredList] = useState([])
    //
    const [topRestaurantChain, setTopRestaurantChain] = useState([])
    //
    const [recipes, setRecipes] = useState([])
    //
    const [bestPlace, setBestPlace] = useState([])
    const [bestCuisines, setBestCuisines] = useState([])
    const [exploreRestaurant, setExploreRestaurant] = useState([])

    //
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    const RestaurantCardOffer = withOfferLabel(RestaurantCard);
    //
    const MiniResCard = checkIt(RestaurantMiniCard)
    const RecipesCard = checkIt(Recipes)

    //scrollHandler
    const [prevScrollY, setPrevScrollY] = useState(0);
    let flag = true
    const scrollHandler = () =>{
        
        if(flag){
            flag = false;
            postData()
            console.log("postData")
        }
        
    }

    useEffect(() => {
        fetchData();

        // postData()
        //scroll eventHandler
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, []);
    const fetchData = async () => {
        console.log("fetch Data")
        const data = await fetch(corsproxy + SWIGGY_API);

        const json = await data.json();
        // console.log(json);

        //update payload
        payload.nextOffset = json?.data?.pageOffset?.nextOffset;
        payload._csrf = json?.csrfToken;
        payload.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;
        
                                    //2 -> 5
        setResLists(json?.data?.cards[5]?.card?.card.gridElements?.infoWithStyle?.restaurants);
        setFilteredList(json?.data?.cards[5]?.card?.card.gridElements?.infoWithStyle?.restaurants);
        // setFilteredList(resLists)  //why this will not work?

        setTopRestaurantChain(json?.data?.cards[2]?.card?.card.gridElements?.infoWithStyle?.restaurants)
        setRecipes(json?.data?.cards[1]?.card?.card?.imageGridCards?.info)

        //
        setBestPlace(json?.data?.cards[7]?.card?.card?.brands)
        setBestCuisines(json?.data?.cards[8]?.card?.card?.brands)
        setExploreRestaurant(json?.data?.cards[9]?.card?.card?.brands)
    }
    // console.log(filteredList)
    // console.log("body render");
    const postData = async () =>{
        console.log("resLists : ", resLists)
        console.log("filteredList: ",filteredList)

        const url = corsproxy + "https://www.swiggy.com/dapi/restaurants/list/update"
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body : JSON.stringify(payload)
        })

        const json = await data.json();
        payload.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo;

        console.log(json)
        console.log(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setResLists(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
        setFilteredList(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
    }

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return <>
        <h1>It's look like you are offline!!!</h1>
        <p>Please check your network connectivity...</p>
    </>
    return (
        resLists?.length === 0 ? <Shimmer />
            :
            <div className="body mt-44">
                <div className="filter m-4 p-4 flex justify-center">
                    <input data-testid="searchInput" type="text" className="p-2 m-4 border-2 border-solid border-black rounded-xl" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                    <button className="px-4 py-2 my-4 bg-green-100 rounded-lg" onClick={() => {
                        const filteredRes = resLists?.filter((res) => (res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) || res?.info?.cuisines.join(',').toLowerCase().includes(searchText.toLowerCase())));
                        setFilteredList(filteredRes)
                        // setResLists(filteredRes)
                    }} >Search</button>
                    <button className="px-4 py-2 my-4 mx-8 bg-gray-100 rounded-lg" onClick={() => {
                        setFilteredList(resLists.filter(resData => resData?.info?.avgRating > 4))
                    }}>Top Rated Restaurants</button>

                    {/* <div className="p-2 my-4"><label>User Name : </label><input type="text" onChange={(e) => setUserName(e.target.value)} /></div> */}
                </div>

                <div className="m-8">
                    <h2 className="text-2xl font-bold mb-4">What's on your mind?</h2>
                    <RecipesCard resData={recipes} />
                </div>

                <div className="m-8">
                    <h2 className="text-2xl font-bold mb-4">Top Restaurant Chain</h2>
                    <MiniResCard resData={topRestaurantChain}/>
                </div>

                <hr className="mt-12 mb-4 mx-8"></hr>
                <h3 className="font-bold text-lg ml-8 sm:ml-16 md:ml-32">Restaurants with online food delivery</h3>
                <div className="flex flex-wrap justify-center">
                    {
                        //filteredList?.map(restaurant => <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />)
                        filteredList?.map(restaurant => <Link style={{ color: "black", textDecoration: 'none' }} key={restaurant?.info?.id} to={"/restaurant/" + restaurant?.info?.id}>
                            {/* <RestaurantCard resData={restaurant} /> */}
                            {
                                //restaurant.info.promoted ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                                ("aggregatedDiscountInfoV3" in restaurant?.info) ? <RestaurantCardOffer resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                                //restaurant?.info?.aggregatedDiscountInfoV3 ? <RestaurantCardOffer resData={restaurant} /> : <RestaurantCard resData={restaurant} />
                            }
                        </Link>)
                    }
                </div>

                <div>
                    <DataFooter bestPlace={bestPlace} bestCuisines={bestCuisines} exploreRestaurant={exploreRestaurant}/>
                    {/* <DataFooter {bestPlace, bestCuisines ,exploreRestaurant}/> */}
                </div>

            </div>
    )
}

export default Body
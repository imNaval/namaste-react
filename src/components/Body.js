import RestaurantCard, { withOfferLabel, withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { restaurantData } from "../utils/mockData";
import { API_END, API_START, SWIGGY_API, UNSERVICEABLE_ERROR, corsproxy, payload, SERVER_URL } from "../utils/constants";
import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import RestaurantMiniCard from "./RestaurantMiniCard";
import Recipes from "./Recipes";
import Carousel from "./Carousel";
import getRestaurantList from "../utils/getRestaurantList";
import checkIt from "./CheckIt";
import DataFooter from "./DataFooter";
import { useSelector } from "react-redux";

const Body = () => {

    // const { loggedInUser, setUserName } = useContext(UserContext)
    const resContainerRef = useRef(null)
    const footerDataRef = useRef(null)
    const [makeApiCall, setMakeApiCall] = useState(false)

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

    //
    const userLocation = useSelector(store => store.user)
    const {latitude, longitude} = userLocation
// console.log(latitude, longitude)

    const debounce = (func, delay=500) =>{
        let timer;

        return function(){

            clearTimeout(timer)
            let args = arguments
            let Content = this
            timer = setTimeout(()=>{
                // console.log("hello ", resLists?.length, filteredList?.length)
                func.apply(Content, args)
                // resLists?.length > 0 && func.apply(Content, args)
            }, delay)
        }
    }
    const getData = () => {
        // Handle visibility
        let resContainerVisibility, footerDataVisibility;
        if (resContainerRef.current) {
          const { top, bottom } = resContainerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          resContainerVisibility = top < windowHeight && bottom >= 100;
        }
        if (footerDataRef.current) {
          const { top, bottom } = footerDataRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          footerDataVisibility = top < windowHeight && bottom >= 0;
        }
      
        const apiCall = resContainerVisibility && footerDataVisibility;
        setMakeApiCall(apiCall);
        if (apiCall) {
          postData();
        }
      };
    const scrollHandler = debounce(getData)

    useEffect(() => {
        //to scroll top
        window.scrollTo(0, 0)
        fetchData();
        // console.log("useEffect triggered")
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [userLocation]);

    const fetchData = async () => {
        try{
        const url = `${API_START}lat=${latitude}&lng=${longitude}&${API_END}`
        // console.log(url)
        // const data = await fetch(corsproxy +  SWIGGY_API)
        const data = await fetch(`${SERVER_URL}/api/swiggy/getData?lat=${latitude}&lng=${longitude}`)

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
        catch{
            setResLists(null)
        }
    }

    const postData = async () =>{
        try{
        // const url = corsproxy + "https://www.swiggy.com/dapi/restaurants/list/update"
        const url = SERVER_URL + "/api/swiggy/update"
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

        // console.log(json)
        setResLists(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
        setFilteredList(prev => [...prev, ...(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants)])
        // console.log(makeApiCall)
        setMakeApiCall(false);
        }
        catch{
            setMakeApiCall(false);
        }
    }

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) return <>
        <h1>It's look like you are offline!!!</h1>
        <p>Please check your network connectivity...</p>
    </>

    if(resLists?.length === 0) return <Shimmer />
    return (
        !resLists ? <div className="flex justify-center">
            <img src={UNSERVICEABLE_ERROR} alt="unservisable"/>
        </div>
            :
            <div className="body mt-0 overflow-x-hidden">
            {/* <div className="body pt-16 bg-slate-50"> */}
                <div className="m-8">
                    <h2 className="text-2xl sm:font-bold mb-4">What's on your mind?</h2>
                    <RecipesCard resData={recipes} />
                </div>

                <div className="m-8">
                    <h2 className="text-2xl sm:font-bold mb-4">Top Restaurant Chain</h2>
                    <MiniResCard resData={topRestaurantChain}/>
                </div>

                <hr className="mt-16 mb-4 mx-8"></hr>
                <div className="filter m-4 p-4 md:flex justify-center">
                    <input data-testid="searchInput" type="text" className="p-2 ml-[10%] sm:ml-[20%] md:ml-4 m-4 w-[16rem] sm:w-[24rem] border-2 border-solid border-gray-500 rounded-xl" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
                    <div className="flex justify-center">
                        <button className="px-4 py-2 my-4 bg-green-100 rounded-lg" onClick={() => {
                            const filteredRes = resLists?.filter((res) => (res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) || res?.info?.cuisines.join(',').toLowerCase().includes(searchText.toLowerCase())));
                            setFilteredList(filteredRes)
                        }} >Search</button>
                        <button className="px-4 py-2 my-4 mx-8 bg-gray-100 rounded-lg" onClick={() => {
                            setFilteredList(resLists.filter(resData => resData?.info?.avgRating > 4))
                        }}>Top Rated Restaurants</button>
                    </div>
                </div>

                <hr className="mt-8 mb-4 mx-8"></hr>
                <h3 className="sm:font-bold text-2xl ml-8 sm:ml-16 md:ml-24">Restaurants with online food delivery</h3>
                <div className="flex flex-wrap justify-center" ref={resContainerRef}>
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

                {
                    makeApiCall && <Shimmer />
                }

                <div ref={footerDataRef}>
                    <DataFooter bestPlace={bestPlace} bestCuisines={bestCuisines} exploreRestaurant={exploreRestaurant}/>
                    {/* <DataFooter {bestPlace, bestCuisines ,exploreRestaurant}/> */}
                </div>

            </div>
    )
}

export default Body
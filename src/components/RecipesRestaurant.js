import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { SERVER_URL, UNSERVICEABLE_ERROR, payloadForRecipes } from '../utils/constants';
import Shimmer from './Shimmer';
import RestaurantCard, { withOfferLabel } from './RestaurantCard';


const RecipesRestaurant = () => {
    const [resInfo, setResInfo] = useState([])
    const [resList, setResList] = useState([])

    const [makeApiCall, setMakeApiCall] = useState(false)
    const resContainerRef = useRef(null)
    const footerDataRef = useRef(null)

    const RestaurantCardOffer = withOfferLabel(RestaurantCard);

    const location = useLocation();
    let link = location?.state?.link
    if(!link) link = `https://www.swiggy.com/collections/83645?collection_id=83645&tags=layout_CCS_NorthIndian&type=rcv2`;

    const queryParams = new URLSearchParams(location.search)
    const collectionId = queryParams.get('collection_id');
    const tags = queryParams.get('tags');
    const type = queryParams.get('type');
    const query = link?.substring(link?.indexOf('?')+1) || `collection_id=${collectionId}&tags=${tags}&type=${type}`


    const debounce = (func, delay=200) =>{
        let timer;
        return function(){
            clearTimeout(timer)
            let args = arguments
            let Content = this
            timer = setTimeout(()=>{
                func.apply(Content, args)
            }, delay)
        }
    }
    const getData = () => {
        // Handle visibility
        let resContainerVisibility, footerDataVisibility;
        if (resContainerRef.current) {
          const { top, bottom } = resContainerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          resContainerVisibility = top < windowHeight && bottom >= 180;
        }
        if (footerDataRef.current) {
          const { top, bottom } = footerDataRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          footerDataVisibility = top < windowHeight && bottom >= 0;
        }
      
        const apiCall = resContainerVisibility && footerDataVisibility && payloadForRecipes.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food;
        setMakeApiCall(apiCall);
        if (apiCall) {
          postData();
        }
      };
    const scrollHandler = debounce(getData)

    useEffect(()=>{
        window.scrollTo(0, 0)
        fetchData();

        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [])
    const fetchData = async()=>{
        try{
            const data = await fetch(`${SERVER_URL}/api/swiggy/getRecipesData?${query}`)
            const json = await data.json();
            setResInfo(json?.data)
            setResList(json?.data?.cards)

            //update payloadForRecipes
            payloadForRecipes.nextOffset = json?.data?.pageOffset?.nextOffset;
            payloadForRecipes._csrf = json?.csrfToken;
            payloadForRecipes.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food;
            payloadForRecipes.collection = collectionId
            payloadForRecipes.tags = tags
            payloadForRecipes.type = type
        }
        catch{
            setResInfo(null)
        }
    }

    const postData = async () =>{
        try{
        const url = SERVER_URL + "/api/swiggy/update"
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body : JSON.stringify(payloadForRecipes)
        })

        const json = await data.json();
        payloadForRecipes.widgetOffset.collectionV5RestaurantListWidget_SimRestoRelevance_food = json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget_SimRestoRelevance_food;

        setResList(prev => [...prev, ...json?.data?.cards])
        setMakeApiCall(false);
        }
        catch{
            setMakeApiCall(false);
        }
    }

    if(resInfo?.length === 0) return <Shimmer />
  return (
    !resInfo ? <div className="flex justify-center">
        <img src={UNSERVICEABLE_ERROR} alt="unservisable"/>
    </div>
    :
    <div className='mt-20 xs:mt-28 mb-12'>
        <h3 className="sm:font-bold text-2xl ml-8 sm:ml-16 md:ml-24">{resInfo?.cards[0]?.card?.card?.title}</h3>
        <p className="ml-8 sm:ml-16 md:ml-24">{resInfo?.cards[0]?.card?.card?.description}</p>

        <div className="flex flex-wrap justify-center" ref={resContainerRef}>
            {
                resList?.map((restaurant, idx) => idx > 2 && <Link style={{ color: "black", textDecoration: 'none' }} key={restaurant?.card?.card?.info?.id} to={"/restaurant/" + restaurant?.card?.card?.info?.id}>
                    {
                        ("aggregatedDiscountInfoV3" in restaurant?.card?.card?.info) ? <RestaurantCardOffer resData={restaurant?.card?.card} /> : <RestaurantCard resData={restaurant?.card?.card} />
                    }
                </Link>)
            }
        </div>
        {
            makeApiCall && <Shimmer />
        }
        <div className='font-bold' ref={footerDataRef}><hr /></div>
    </div>
  )
}

export default RecipesRestaurant
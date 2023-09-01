import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import { MENU_API } from '../utils/constants';

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    // const params = useParams();
    // console.log(params);
    const {resId} = useParams();

    useEffect(() => {
        fetchMenu();
    }, [])
    const fetchMenu = async() => {
        const data = await fetch(MENU_API + resId)
        const json = await data.json()

        console.log(json)
        setResInfo(json?.data)
    }

    if(resInfo == null) return <Shimmer />

    const { name, costForTwoMessage, cuisines } = resInfo?.cards[0]?.card?.card?.info

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    console.log(itemCards)

  return (
    <div>
        <h2>{name}</h2>
        <p>{cuisines.join(', ')} : {costForTwoMessage}</p>

        <h3>Menu</h3>
        <ul>
            {/* <li>{itemCards[0]?.card?.info?.name}</li> */}
            {
                itemCards?.map((itemCard, index)=> <li key={index}>{itemCard?.card?.info?.name} : Rs. {itemCard?.card?.info?.price/100 || itemCard?.card?.info?.defaultPrice/100}</li>)
            }
        </ul>
        
        {/* <div className='menuItems'>
            {
                itemCards.map((itemCard, index)=> (
                    <div key={index}>
                        <h5>{itemCard?.card?.info?.name}</h5>
                        <h6>{itemCard?.card?.info?.price/100 || itemCard?.card?.info?.defaultPrice/100}Rs</h6>
                        <p>itemCard?.card?.info?.description</p>
                    </div>
                    )
                )
            }
        </div> */}
    </div>
  )
}

export default RestaurantMenu
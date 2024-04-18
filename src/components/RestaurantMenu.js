import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from './Shimmer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {

    // debugger
    // const params = useParams();
    // console.log(params);

    const [showIndex, setShowIndex] = useState(null)

    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    if(resInfo == null) return <Shimmer />

    const { name, costForTwoMessage, cuisines } = resInfo?.cards[2]?.card?.card?.info //0 >> 2
    //const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    // console.log(itemCards)
    
        // 2 >> 4
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c?.card?.card?.["@type"].includes(".ItemCategory")) //there is also sub-category so we need to handle it .. latter i will do it ********
    // console.log(categories)

  return (
    <div className='mt-20 xs:mt-28 text-center'>
        <h2 className='sm:font-bold text-2xl my-6'>{name}</h2>
        <p className='xxs:font-bold text-md'>{cuisines.join(', ')} : {costForTwoMessage}</p>
        {
            categories.map((category, index) => <RestaurantCategory 
                key={category.card.card.title} 
                data={category?.card?.card} 
                showItem = {index == showIndex ? true : false}
                setShowIndex = {()=> setShowIndex(prev => prev===index ? null : index)}
            />)
        }

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
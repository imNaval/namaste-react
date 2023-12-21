import { RES_LOGO} from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props
    const { name, cuisines, avgRatingString, cloudinaryImageId, costForTwo } = resData?.info;
    const time = resData?.info?.sla?.deliveryTime;
    return (
        // <div className="m-4 p-4 w-[16rem] rounded-lg hover:bg-gray-400" style={{ backgroundColor: "#DDDDDD" }}>
        <div data-testid="resCard" className="m-4 p-1 sm:p-4 w-[15rem] sm:w-[17rem] h-72 md:h-96 overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-300">
            <img className="rounded-lg w-full h-40" alt="restaurant logo"
                src={RES_LOGO + cloudinaryImageId}
            />
            <h3 className="sm:font-bold py-1 text-xl sm:text-lg">{name}</h3>
            <h4>{avgRatingString}⭐ ratings</h4>
            <h5>{(cuisines.join(', ')).length > 60 ? cuisines.join(', ').substring(0, 60) : cuisines.join(', ')}</h5>
            <div className="invisible md:visible">
                <h5>{costForTwo}</h5>
                <h5>{time} minutes</h5>
            </div>
        </div>
    )
}

export const withPromotedLabel = (RestaurantCard) => {
    return (props) =>{
        return (
            <div>
                <label>Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export const withOfferLabel = (RestaurantCard) => {
    return (props)=>{
        const { header,subHeader } = props?.resData?.info?.aggregatedDiscountInfoV3
        return (
            <div>
                <label className="absolute p-2 ml-8 sm:ml-12 mt-32 text-sm sm:text-lg font-extrabold text-white bg-gray-400 rounded-lg">{header} {subHeader}</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;
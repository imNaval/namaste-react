import { RES_LOGO} from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props
    const { name, cuisines, avgRatingString, cloudinaryImageId } = resData?.info;
    const time = resData?.info?.sla?.deliveryTime;
    return (
        <div className="restaurant-card" style={{ backgroundColor: "lightgray" }}>
            <img className="res-logo" alt="restaurant logo"
                src={RES_LOGO + cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{cuisines.join(', ')}</h4>
            <h4>{avgRatingString}⭐ ratings</h4>
            <h4>{resData.costForTwo}</h4>
            <h4>{time} minutes</h4>
        </div>
    )
}

export default RestaurantCard;
import { RES_LOGO} from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props
    const { name, cuisines, avgRatingString, cloudinaryImageId, costForTwo } = resData?.info;
    const time = resData?.info?.sla?.deliveryTime;
    return (
        <div className="restaurant-card" style={{ backgroundColor: "#DDDDDD" }}>
            <img className="res-logo" alt="restaurant logo"
                src={RES_LOGO + cloudinaryImageId}
            />
            <h3>{name}</h3>
            <h4>{avgRatingString}⭐ ratings</h4>
            <h5>{cuisines.join(', ')}</h5>
            <h5>{costForTwo}</h5>
            <h5>{time} minutes</h5>
        </div>
    )
}

export default RestaurantCard;
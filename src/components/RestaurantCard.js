import { RES_LOGO} from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props
    const { name, cuisines, avgRatingString, cloudinaryImageId, costForTwo } = resData?.info;
    const time = resData?.info?.sla?.deliveryTime;
    return (
        // <div className="m-4 p-4 w-[16rem] rounded-lg hover:bg-gray-400" style={{ backgroundColor: "#DDDDDD" }}>
        <div className="m-4 p-4 w-[17rem] h-96 rounded-lg bg-gray-100 hover:bg-gray-300">
            <img className="rounded-lg w-full h-40" alt="restaurant logo"
                src={RES_LOGO + cloudinaryImageId}
            />
            <h3 className="font-bold py-1 text-lg">{name}</h3>
            <h4>{avgRatingString}⭐ ratings</h4>
            <h5>{cuisines.join(', ')}</h5>
            <h5>{costForTwo}</h5>
            <h5>{time} minutes</h5>
        </div>
    )
}

export default RestaurantCard;
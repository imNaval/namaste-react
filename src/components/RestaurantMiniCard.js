import { RES_LOGO } from "../utils/constants";

const RestaurantMiniCard = (props) =>{
    const { resData } = props
    const { name, cuisines, avgRatingString, cloudinaryImageId } = resData?.info;
    const time = resData?.info?.sla?.slaString;
    return (
        <div data-testid="resCard" className="flex-shrink-0 m-4 p-1 w-[16rem] h-72 rounded-lg bg-gray-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300 ">
            <img className="rounded-lg w-full h-40" alt="restaurant logo"
                src={RES_LOGO + cloudinaryImageId}
            />
            <h3 className="font-bold pt-1 text-md">{name.length > 25 ? name.substring(0, 25) + "..." : name}</h3>
            <div className="flex font-bold">
                <h4>⭐{avgRatingString}</h4>
                <h5 className="pl-2"> •{time} minutes</h5>
            </div>
            {/* <h5>{cuisines.join(', ')}</h5> */}
            <h5>{(cuisines.join(', ')).length > 60 ? cuisines.join(', ').substring(0, 60) : cuisines.join(', ')}</h5>
        </div>
    )
}

export default RestaurantMiniCard
// import React from 'react'

const DataFooter = ({bestPlace, bestCuisines, exploreRestaurant}) => {
  return (
    <div className="m-16" id="footerData">
        <hr className="m-4"/>
        <div className="mb-8">
            <h1 className="font-bold text-xl">Best Places to Eat Across Cities</h1>
            <div className="flex flex-wrap justify-between">
            {
                bestPlace?.map(place => <div key={place.link}><button className="p-4 m-4 w-[16rem] border border-black rounded-lg">{place.text.length > 25 ? place.text.substring(0,20) + "..." : place.text}</button></div>)
            }
            </div>
        </div>

        <div className="mb-8">
            <h1 className="font-bold text-xl">Best Cuisines Near Me</h1>
            {/* {bestCuisines?.map(place => <button className="p-4 m-4 w-[16rem] border border-black rounded-lg">{place.text.length > 25 ? place.text.substring(0,20) + "..." : place.text}</button>)} */}
            <div className="flex flex-wrap justify-between">{
                bestCuisines?.map(place => <div key={place.link}><button className="p-4 m-4 w-[16rem] border border-black rounded-lg">{place.text.length > 25 ? place.text.substring(0,20) + "..." : place.text}</button></div>)
            }</div>
        </div>

        <div className="mb-8">
            <h1 className="font-bold text-xl">Explore Every Restaurants Near Me</h1>
            <div className="flex justify-around">
                {exploreRestaurant?.map(place => <div key={place.link}><button className="p-4 m-4 w-[32rem] border border-black rounded-lg">{place.text}</button></div>)}
            </div>
        </div>
    </div>
  )
}

export default DataFooter
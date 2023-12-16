import React, { useState } from 'react'
// import { FaXmark } from "react-icons/fa6";
import { FaMap } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '../utils/userSlice';
import "../utils/Scrollbar.css"

const City = ({handleVisible, X}) => {

    const [searchLocation, setSearchLocation] = useState([])
    const dispatch = useDispatch();

    function debounce(func, delay = 500){
        let timer;
        return function(){
            let args = arguments;
            let context = this;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args)
            }, delay);
        }
    }
    const getData = (e)=>{
        // console.log("get search data", e.target.value)
        const getCitySuggestions = async (query) => {
            try {
            //   const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q='query'`;
              const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
            //   const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent('udai')}&countrycodes=IN&autocomplete=1`;
            

              const response = await fetch(apiUrl);
              const data = await response.json();
          
              if (data.length > 0) {
                const suggestions = data.map((result) => result.display_name);
                // console.log("city: ", data)
                // console.log('City Suggestions:', suggestions);
                setSearchLocation(data)
                return suggestions;
              } else {
                // console.error('No suggestions found');
                return [];
              }
            } catch (error) {
              // console.error('Error fetching city suggestions:', error);
              return [];
            }
          };
          
          // Example usage
          getCitySuggestions(e.target.value);
    }
    const handleSearch = debounce((e)=>getData(e))
  return (
    // <div className='absolute bg-slate-100 w-[40rem] h-screen top-40'>
    <div className='bg-slate-100 w-[28rem] sm:w-[34rem] md:w-[40rem] h-screen overflow-y-scroll overflow-x-hidden pb-12 custom-scrollbar'>
    {/* <FaXmark className='h-6 w-6'/> */}
        <button className='ml-16 m-4 block' onClick={() => handleVisible(prev => !prev)}> <X className="w-6 h-6" /> </button>
        <input type='text' className='p-4 mt-4 ml-4 sm:ml-16 text-lg rounded-lg bg-slate-100 border border-black w-2/3'  onChange={(e) =>handleSearch(e)} />

        <div className='ml-4 sm:ml-24 mt-8'>
        {
            searchLocation?.map(location => <div key={location?.place_id} className='flex items-center mb-4 cursor-pointer'>
                <FaMap className='mr-4' />
                <div onClick={()=>{
                      dispatch(setUserLocation(location))
                      handleVisible(prev => !prev)
                  }}>
                    <h4 className='text-lg hover:text-orange-600'>{location?.name}</h4>
                    <p className='text-xs text-gray-500'>{location.display_name}</p>
                    <p className='text-xs text-gray-500 overflow-hidden'>-------------------------------------------------------------------</p>
                </div>
            </div>)
        }
        </div>
    </div>
  )
}

export default City
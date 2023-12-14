import React, { useState } from 'react'
import { FaXbox } from 'react-icons/fa'
import { FaMap } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '../utils/userSlice';
import "../utils/Scrollbar.css"

const City = ({handleVisible}) => {

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
    <div className='bg-slate-100 w-[40rem] h-screen overflow-y-scroll overflow-x-hidden pb-12 custom-scrollbar'>
        <button className='ml-16 m-4 block' onClick={() => handleVisible(prev => !prev)}>❎</button>
        <input type='text' className='p-4 mt-4 ml-16 text-lg rounded-lg bg-slate-100 border border-black w-2/3'  onChange={(e) =>handleSearch(e)} />

        <div className='ml-24 mt-8'>
        {
            searchLocation?.map(location => <div key={location?.place_id} className='flex items-center mb-4 cursor-pointer'>
                <FaMap className='mr-4' />
                <div onClick={()=>{
                      dispatch(setUserLocation(location))
                      handleVisible(prev => !prev)
                  }}>
                    <h4 className='text-lg hover:text-orange-600'>{location?.name}</h4>
                    <p className='text-xs text-gray-500'>{location.display_name}</p>
                    <p className='text-xs text-gray-500'>---------------------------------------------------------------------------</p>
                </div>
            </div>)
        }
        </div>
    </div>
  )
}

export default City
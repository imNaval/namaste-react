import React from 'react'
import { RES_LOGO } from '../utils/constants' //res-logo --> cdn_img
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice';

const MenuItemList = ({ items }) => {
    // console.log(items)
    const dispatch = useDispatch();

    const handleClick = (item) =>{
        dispatch(addItem(item))
    }

    return (
        <div>
            {
                items.map(item => (
                    <div data-testid="menuItems" key={item?.card?.info?.id} className='p-2 m-2 border-b-2 border-gray-300 text-left flex justify-between'>
                        <div className='w-9/12'>
                            <div className='py-2'>
                                <span>{item?.card?.info?.name}</span>
                                <span> - ₹ {item?.card?.info?.price ? item?.card?.info?.price / 100 : item?.card?.info?.defaultPrice / 100}</span>
                            </div>
                            <p className='text-sm text-gray-400'>{item?.card?.info?.description}</p>
                        </div>
                        <div className='w-3/12 p-4'>
                            <button className='absolute mx-12 px-2 py-1 font-bold bg-slate-50 text-green-700 border-gray-200 border-2 rounded-lg shadow-lg' onClick={() => handleClick(item)}>ADD +</button>
                            { item?.card?.info?.imageId && <img alt="food-image" className='w-full' src={RES_LOGO + item?.card?.info?.imageId} /> }
                            {/* <button className='absolute left-12 bottom-2 px-4 py-2 font-bold bg-slate-50 text-green-700 border-gray-200 border-2 rounded-lg shadow-lg' onClick={() => handleClick(item)}>ADD +</button> */}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MenuItemList
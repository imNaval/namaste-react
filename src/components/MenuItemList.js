// import React from 'react'
import { RES_LOGO } from '../utils/constants' //res-logo --> cdn_img
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice';

const MenuItemList = ({ items, addBtn=true }) => {
    // console.log(items)
    const dispatch = useDispatch();

    const handleClick = (item) =>{
        // console.log(item)
        dispatch(addItem({...item, quantity:1}))
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
                        {/* <div className='w-3/12 p-4'>
                            {addBtn && <button className='absolute mx-12 px-2 py-1 font-bold bg-slate-50 text-green-700 border-gray-200 border-2 rounded-lg shadow-lg' onClick={() => handleClick(item)}>ADD +</button> }
                            { item?.card?.info?.imageId && <img alt="food-image" className='w-full' src={RES_LOGO + item?.card?.info?.imageId} /> }
                            {!addBtn && <div className='absolute mx-12 px-2 top-1/2 font-bold bg-slate-50 text-gey-700 border-gray-200 border-2 rounded-lg shadow-lg'>Quantity</div> }
                        </div> */}
                        <div className='w-1/6 p-6 relative'>
                            {addBtn && <button className='absolute right-12 px-2 bottom-4 font-bold bg-slate-50 text-green-700 border-gray-200 border-2 rounded-lg shadow-lg' onClick={() => handleClick(item)}>ADD +</button> }
                            { item?.card?.info?.imageId && <img alt="food-image" className='w-full max-h-24 rounded-lg' src={RES_LOGO + item?.card?.info?.imageId} /> }
                            {!addBtn && <div className='absolute px-2 right-1 bottom-1 bg-slate-50 text-gey-700 border-gray-200 border-1 rounded-lg'>Quantity={item?.quantity}</div> }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MenuItemList
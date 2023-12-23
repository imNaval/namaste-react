import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from 'react-router-dom';

const Cart = () =>{
    const grandTotal = useSelector(store => store.cart.grandTotal)
    const cartItems = useSelector((store) => store.cart.items)
    const dispatch = useDispatch()

    const handleClearCart = () => {
        dispatch(clearCart())
        localStorage.clear();
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])

    return(
        <div className="text-center m-4 p-4">
            <h1 className="font-bold text-xl">Cart</h1>
            <div className="w-full xs:w-2/3 sm:w-1/2 m-auto pb-12">
                <button className="p-2 m-4 bg-black text-white rounded-lg" onClick={handleClearCart}>Clear Cart</button>
                {
                    cartItems.length === 0 && <h1>Cart is empty, Add Item to cart</h1>
                }
                <MenuItemList items={cartItems} addBtn={false} />

                {
                    cartItems.length !== 0 && <div className='flex justify-between mt-4 p-4 border border-orange-100 rounded-lg'>
                        <p className='p-2 font-bold text-lg text-orange-400'>Grand Total : {grandTotal}</p>
                        <button className='p-2 font-bold bg-slate-50 text-green-700 border-gray-200 border-2 rounded-lg shadow-lg'><Link to="/payment">Place Order</Link></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart;
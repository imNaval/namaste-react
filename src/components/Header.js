import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_URL } from '../utils/constants'
//import logo from "../../public/foodLogo.png"
import useOnlineStatus from '../utils/useOnlineStatus'
import UserContext from '../utils/UserContext'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useSelector } from 'react-redux'


const Header = () => {

    const [userStatus, setUserStatus] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    const cartItem = useSelector((store) => store.cart.items)
    // console.log(cartItem)

    return (
        <div className="header fixed z-50 top-0 left-0 right-0 flex justify-between bg-pink-50 shadow-md sm:bg-yellow-50 lg:bg-blue-50">
            <div className="logo-container">
                <img
                    className="w-40"
                    alt="logo"
                    src={LOGO_URL}
                    // src="../../public/foodLogo.png" & src="/public/foodLogo.png" << these both not work like this
                    // src={logo}
                />
            </div>

            <div className="flex items-center">
                <ul className='flex p-4 m-4'>
                    <li className='px-4'>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li className='px-4'><Link to='/'>Home</Link></li>
                    <li className='px-4'><Link to='/about'>About Us</Link></li>
                    <li className='px-4'><Link to='/contact'>Contact Us</Link></li>
                    <li className='px-4'><Link to='/grocery'>Grocery</Link></li>
                    <li className='px-4'><Link to='/cart'>Cart - ({cartItem.length} items)</Link></li>
                    <button className='login-btn'
                        onClick={()=>{
                            userStatus === "Login" ? setUserStatus("Logout") : setUserStatus("Login");
                        }}
                    >{userStatus}</button>
                    <li className='px-4'>User : { userStatus === "Login" ? "Default-User" : loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header

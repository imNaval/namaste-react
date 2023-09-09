import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_URL } from '../utils/constants'
import logo from "../../public/foodLogo.png"
import useOnlineStatus from '../utils/useOnlineStatus'

const Header = () => {

    const [userStatus, setUserStatus] = useState("Login");

    const onlineStatus = useOnlineStatus();

    return (
        <div className="header fixed top-0 left-0 right-0 flex justify-between bg-pink-50 shadow-md sm:bg-yellow-50 lg:bg-blue-50">
            <div className="logo-container">
                <img
                    className="w-40"
                    alt="logo"
                    // src={LOGO_URL}
                    // src="../../public/foodLogo.png" & src="/public/foodLogo.png" << these both not work like this
                    src={logo}
                />
            </div>

            <div className="flex items-center">
                <ul className='flex p-4 m-4'>
                    <li className='px-4'>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li className='px-4'><Link to='/'>Home</Link></li>
                    <li className='px-4'><Link to='/about'>About Us</Link></li>
                    <li className='px-4'><Link to='/contact'>Contact Us</Link></li>
                    <li className='px-4'><Link to='/grocery'>Grocery</Link></li>
                    <li className='px-4'>Cart</li>
                    <button className='login-btn'
                        onClick={()=>{
                            userStatus === "Login" ? setUserStatus("Logout") : setUserStatus("Login");
                        }}
                    >{userStatus}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header

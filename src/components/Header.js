import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_URL } from '../utils/constants'
import logo from "../../public/foodLogo.png"

const Header = () => {

    const [userStatus, setUserStatus] = useState("Login");

    return (
        <div className="header">
            <div className="logo-container">
                <img
                    className="logo"
                    alt="logo"
                    // src={LOGO_URL}
                    // src="../../public/foodLogo.png" & src="/public/foodLogo.png" << these both not work like this
                    src={logo}
                />
            </div>

            <div className="nav-item">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About Us</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    <li>Cart</li>
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

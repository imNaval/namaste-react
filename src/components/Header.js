import React, { useState } from 'react'
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
                    <li>Home</li>
                    <li>About Us</li>
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

import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_URL } from '../utils/constants'
//import logo from "../../public/foodLogo.png"
import useOnlineStatus from '../utils/useOnlineStatus'
import UserContext from '../utils/UserContext'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useSelector } from 'react-redux'
import { FaCartPlus } from 'react-icons/fa';
import logo from "../utils/images/logo.png"
import { FaSearch } from 'react-icons/fa';
import City from './City'


const Header = () => {

    const [userStatus, setUserStatus] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    const cartItem = useSelector((store) => store.cart.items)
    const userCity = useSelector(store => store.user.cityName)
    // console.log(cartItem)

    // const [userLocation, setUserLocation] = useState("Udaipur, Rajasthan   " + "⬇️")
    const [cityVisibility, setCityVisibility] = useState(false)

    return (
        <div className="header fixed z-50 top-0 left-0 right-0 flex justify-between bg-pink-50 shadow-md sm:bg-yellow-50 lg:bg-blue-50">
            <div className="logo-container flex items-center">
                <Link to='/'>
                <img
                    className="w-40"
                    alt="logo"
                    // src={LOGO_URL}
                    src={logo}
                    // src="../../public/foodLogo.png" & src="/public/foodLogo.png" << these both not work like this
                />
                </Link>

                <input className='p-4 text-lg hover:text-orange-500 cursor-pointer text-gray-500 rounded-lg outline-none bg-transparent underline'
                    value={userCity}
                    // onChange={(e)=> setUserLocation(e.target.value)}
                    onClick={()=> setCityVisibility(prev => !prev)}
                    readOnly={true}
                />
            </div>

            <div className="flex items-center">
                <ul className='flex p-4 m-4'>
                    {/* <li className='px-4'><Link className='flex items-center' to='/search'><FaSearch /><span className='ml-2'>Search</span></Link></li> */}
                    <li className='px-4 flex items-center'><FaSearch /><span className='ml-2'>Search</span></li>
                    <li className='px-4'>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li className='px-4'><Link to='/grocery'>Grocery</Link></li>
                    {/* <li className='px-4'><Link to='/cart'>Cart - ({cartItem.length} items)</Link></li> */}
                    <li className='px-4 relative'><Link to='/cart'><FaCartPlus className='h-6 w-6' /><span className='absolute -top-4 left-8 text-gray-400'>{cartItem.length}</span></Link></li>
                    <button className='login-btn min-w-[4rem]'
                        onClick={()=>{
                            userStatus === "Login" ? setUserStatus("Logout") : setUserStatus("Login");
                        }}
                    >{userStatus}</button>
                    <li className='px-4 absolute right-0 top-8'>{ userStatus === "Login" ? "" : "User :"+ loggedInUser}</li>
                </ul>
            </div>

            {/* {cityVisibility &&<City handleVisible={setCityVisibility} />} */}
            <div className={`transition-transform transform duration-500 ease-in-out ${cityVisibility ? 'translate-x-0' : '-translate-x-full'} bg-slate-100 p-4 absolute top-0 left-0`}>
                <City handleVisible={setCityVisibility} />
            </div>
        </div>
    )
}

export default Header

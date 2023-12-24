import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LOGO_URL } from '../utils/constants'
//import logo from "../../public/foodLogo.png"
import useOnlineStatus from '../utils/useOnlineStatus'
import UserContext from '../utils/UserContext'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import logo from "../utils/images/logo.png"
import { FaSearch } from 'react-icons/fa';
import { FaBars, FaAngleDown } from 'react-icons/fa'
import { FaXmark } from "react-icons/fa6";
import City from './City'
import { addItem } from '../utils/cartSlice'


const Header = () => {

    const [userStatus, setUserStatus] = useState("Login");

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    const cartItem = useSelector((store) => store.cart.items)
    const userCity = useSelector(store => store.user.cityName)
    // console.log(cartItem)

    const dispatch = useDispatch();

    // const [userLocation, setUserLocation] = useState("Udaipur, Rajasthan   " + "⬇️")
    const [cityVisibility, setCityVisibility] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(window.innerWidth > "1020"); //true

    const handleResize = ()=>{
        if(window.innerWidth > "1024"){
            // !isMenuOpen && setMenuOpen(prev => !prev);
            setMenuOpen(true)
        }
    }
    const updateCart = async() =>{
        //update cart from local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key))
            // console.log(data)
            dispatch(addItem(data))
        }
    }
    useEffect(()=>{
        updateCart();

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [])
    return (
        // <div className="header fixed z-50 top-0 left-0 right-0 flex justify-between bg-pink-50 shadow-md sm:bg-yellow-50 lg:bg-blue-50">
        <div className="header fixed z-50 top-0 left-0 right-0 flex justify-between bg-white shadow-md h-16 xs:h-24">
            <div className="logo-container flex items-center">
                <Link to='/'>
                <img
                    // className="w-40"
                    className="w-24"
                    alt="logo"
                    // src={LOGO_URL}
                    src={logo}
                    // src="../../public/foodLogo.png" & src="/public/foodLogo.png" << these both not work like this
                />
                </Link>
                {/* <input className='p-4 text-xl hover:text-orange-500 cursor-pointer text-gray-500 rounded-lg outline-none bg-transparent' value={userCity} onClick={()=> setCityVisibility(prev => !prev)} readOnly={true} /> */}

                <div className='flex items-center p-4 xs:text-xl hover:text-orange-500 cursor-pointer text-gray-500 bg-transparent' onClick={()=> setCityVisibility(prev => !prev)}>
                    <span className='pr-2'>{userCity}</span>
                    <span className='text-orange-500'><FaAngleDown /></span>
                </div>
            </div>

            <div className="flex items-center">
            <button className="lg:hidden text-black focus:outline-none ml-4 mr-14" onClick={() => setMenuOpen(prev => !prev)}>{isMenuOpen ? <FaXmark className='w-8 h-8' /> : <FaBars className='w-8 h-8' />}</button>
                {/* <ul className='flex p-4 m-4 '> */}
                <ul className={`fixed lg:flex lg:static m-8 mr-0 p-4 right-0 top-8 xs:top-16 bg-white transform ${isMenuOpen  ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out`}>
                    {/* <li className='px-4'><Link className='flex items-center' to='/search'><FaSearch /><span className='ml-2'>Search</span></Link></li> */}
                    <li className='px-4 flex mb-4 lg:mb-0'>
                        <div className='flex'><span className='ml-2'>Search</span> <span><FaSearch className='w-5 h-5 mt-1 ml-1' /></span> </div>
                    </li>
                    <li className='px-4 mb-4 lg:mb-0'>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
                    <li className='px-4 mb-4 lg:mb-0'><Link to='/grocery'>Grocery</Link></li>
                    <li className='px-4 relative mb-4 lg:mb-0'><Link to='/cart'>
                        <div className='flex'><span>Cart</span> <span><FaShoppingCart className='h-8 w-8 text-green-600' /></span></div>
                        <span className='absolute top-0 left-14 text-gray-50 font-bold'>{cartItem.length}</span></Link>
                    </li>
                    <li className='relative w-28'>
                        <button className='login-btn min-w-[4rem] mb-8 lg:mb-0'
                            onClick={()=>{
                                userStatus === "Login" ? setUserStatus("Logout") : setUserStatus("Login");
                            }}
                        >{userStatus}</button>
                        <p className='absolute left-0 top-8'>{ userStatus === "Login" ? "" : "User :"+ loggedInUser}</p>
                    </li>
                    
                </ul>
            </div>

            {/* {cityVisibility &&<City handleVisible={setCityVisibility} />} */}
            <div className={`transition-transform transform duration-500 ease-in-out ${cityVisibility ? 'translate-x-0' : '-translate-x-full'} bg-slate-100 p-4 absolute top-0 left-0`}>
                <City handleVisible={setCityVisibility} X={FaXmark}/>
            </div>
        </div>
    )
}

export default Header

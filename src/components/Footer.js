import React from 'react'
import { LOGO_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import logo from "../utils/images/logo.png"

const Footer = () => {
  return (
    <div className='min-h-[30rem] bg-black text-white flex justify-around pt-16'>
        <div>
            <img
                className="w-20 mb-4"
                alt="logo"
                src={logo}
            />
            <p>© 2023 NavFood,<br/> All right reserved</p>
        </div>
        <div>
            <h2 className='font-bold text-lg mb-8'>Company</h2>
            <p><Link to='/about'>About Me</Link></p>
            <p>Visit my personal website to know more about me </p>
        </div>
        <div>
            <h2 className='font-bold text-lg mb-8'><Link to="/contact">Contact Us</Link></h2>
            <p>Say Hello </p>
            <p>Mobile - 1234567890</p>
            <p>Udaipur, Rajasthan</p>
        </div>
    </div>
  )
}

export default Footer
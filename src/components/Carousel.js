import React from 'react'

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import RestaurantMiniCard from './RestaurantMiniCard';

const Carousel = ({ resData, Component }) => {
    // console.log(resData)
    const length = resData.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    // setCurrentIndex((prevIndex) => (prevIndex === 0 ? length - 1 : prevIndex - 1));
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const nextSlide = () => {
    // setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
    setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? prevIndex : prevIndex + 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform ease-in-out duration-300"
          style={{ transform: `translateX(-${currentIndex * (100 / length)}%)` }}
        >

          {
            resData?.map(restaurant => <Link style={{ color: "black", textDecoration: 'none' }} key={restaurant?.info?.id} to={"/restaurant/" + restaurant?.info?.id}>
                    {
                        <Component resData={restaurant} />
                    }
                </Link>)
            }

        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={prevSlide}
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={nextSlide}
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default Carousel
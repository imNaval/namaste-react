import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RES_LOGO } from '../utils/constants';

const Recipes = (props) =>{
    const { resData } = props
    // console.log(resData)
    const { imageId } = resData;
    const navigate = useNavigate();

    const handleClick = () => {
      // Use navigate to go to the new route with state
      const link = resData?.action?.link
      const query = link.substring(link?.indexOf('?')+1)
      navigate(`/collection/${resData?.id}?${query}`, { state: { link: resData?.action?.link } });
    };

    return (
        <div data-testid="recipes" className=" m-1 p-1 w-[7rem] md:w-[10rem] rounded-lg" onClick={handleClick}>
            <img className="rounded-lg h-32 md:h-40" alt="restaurant logo"
                src={RES_LOGO + imageId}
            />
        </div>
    )
}

export default Recipes
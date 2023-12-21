import React from 'react'
import { RES_LOGO } from '../utils/constants';

const Recipes = (props) =>{
    const { resData } = props
    // console.log(resData)
    const { imageId } = resData;
    return (
        <div data-testid="recipes" className=" m-1 p-1 w-[7rem] md:w-[10rem] rounded-lg">
            <img className="rounded-lg h-32 md:h-40" alt="restaurant logo"
                src={RES_LOGO + imageId}
            />
        </div>
    )
}

export default Recipes
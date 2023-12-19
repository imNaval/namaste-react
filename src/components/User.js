import { useEffect, useState } from "react";

const User = (props) =>{
    const [count, setCount] = useState(0);

    useEffect(()=>{
        //api call

        // console.log("useEffect called");

        const timer = setInterval(()=>{
            // console.log("Namaste React🚀");
        }, 1000)

        return ()=>{
            // console.log("useEffect returned");
            clearInterval(timer);
        }
    },[])

    // console.log("render component");
    return(
        <div className="user-container">
            <div>
                <button onClick={()=>setCount(prev=>prev-1)}><h1> - </h1></button>
                {count}
                <button onClick={()=>setCount(prev=>prev+1)}><h1> + </h1></button>
            </div>
            <h2>{props.name}</h2>
            <h3>Rajasthan</h3>
            <p>@imNaval</p>
        </div>
    )
}

export default User
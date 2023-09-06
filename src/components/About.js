import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component{
    constructor(props){
        super(props);

        // console.log("parent constructor")
    }

    componentDidMount(){
        // console.log("parent did mount")
    }

    componentDidUpdate(){
        // console.log("parent did update");
    }

    render(){
        // console.log("parent render")
        return (
            <div>
                <h1>I'm diving deep in rect with Namaste React🚀</h1>
                <User name={"Naval"} />
                {/* <UserClass name={"Naval (Class)"} /> */}

                {/* <UserClass name={"Child-1"} />
                <UserClass name={"Child-2"} /> */}
            </div>
        )
    }
}

// const About = () =>{
//     return (
//         <div>
//             <h1>I'm diving deep in rect with Namaste React🚀</h1>
//             {/* <User name={"Naval"} /> */}
//             <UserClass name={"Naval (Class)"} />
//         </div>
//     )
// }

export default About;
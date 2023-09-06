import React from "react";
class UserClass extends React.Component {
    constructor(props){
        super(props);
        // super()
        // console.log(this.props)

        this.state = {
            count : 0,
            count2: 2,
            userInfo: {
                name: "dummy",
                location: "default",
            },
        }

        // console.log(this.props.name + " constructor")
    }

    // componentDidMount(){
    //     // console.log(this.props.name + " did mount")
    // }
    // async componentDidMount(){
    //     const data = await fetch("https://api.github.com/users/imNaval")
    //     const json = await data.json()

    //     this.setState({
    //         userInfo: json
    //     })
    // }

    componentDidUpdate(prevProps, prevState){
        console.log(this.props.name + " did update")
        // console.log(prevState)
        if(this.state.count !== prevState.count){
            // console.log("count updated")
        }
    }

    componentDidMount(){
        console.log("component did mount")

        this.myTimer = setInterval(()=>{
            console.log("Namaste React")
        }, 1000)
    }
    componentWillUnmount(){
        console.log("component unmounted");
        clearInterval(this.myTimer)
    }

    render(){
        // console.log(this.props.name + " render")
        const {count} = this.state

        // debugger;
        const {name, location, avatar_url} = this.state.userInfo
        return(
            <div className="user-container">
                {/* <h1>{this.state.count} <button onClick={()=>{
                    this.setState({count: this.state.count+1})
                }}>+</button></h1> */}

                {/* const {count} = this.state  ...then simply use count  */}
                {/* <h1>{count} <button onClick={()=>{
                    this.setState({count: count+1})
                }}>+</button></h1> */}

                <img src={avatar_url} alt="avatar" />
                <h2>{name}</h2>
                <h3>{location}</h3>
                <p>@imNaval</p>
            </div>
        )
    }
}

export default UserClass
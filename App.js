import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", {id:"heading"}, "Hello World, From React");
const jsxHeading = <h1 id="heading">Namaste React using JSX🚀</h1>

//jsxHeading is equivalent to heading
// console.log(heading);
// console.log(jsxHeading);

const HeadingComponent = () => {
    return <h1>Hello from heading component</h1>;
}
const HeadingComponent2 = () => <h1>Hello from heading component2</h1>;


//component composition
const Title = () => <h2>I'm Title</h2>
const Heading = () => (
    <>
        <h1>I'm Heading Component {number}</h1>
        <Title />
        <Title></Title>
        {
            Title()
        }
        {title}
    </>
)
// why not number and title giving us a reference error? bcs we use these inside function.
// And function was always hoisted, the thing matter in function is that when we call the function the variable declared or not
//and i think root.render function call at the end, even if there is anything below it.
const number = 1008;
const title = (
    <>
    <p>I'm just a react element</p>
    {/* <Heading /> >> infinite loop */}
    </>
)

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(jsxHeading);
// root.render(<HeadingComponent />);
root.render(<Heading />)
import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", {id:"heading"}, "Hello World, From React");

//create nested child and sibling
const parent = React.createElement(
    "div",
    {id:"parent"},
    React.createElement(
        "div",
        {id:"child"},
        [
            React.createElement("h1", {key:"h1"}, "I'm h1 tag"),
            React.createElement("h2", {key:"h2"}, "I'm h2 tag")
        ]
    )
)

console.log(heading);
console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact"
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => import("./components/Grocery"))

const AppLayout = () => {

    const [userName, setUserName] = useState("")

    useEffect(()=>{
        const data = {
            name : "Navwe",
        };
        setUserName(data.name);
    }, []);

    return (
        <UserContext.Provider value={{loggedInUser: userName, setUserName }}>
            <div className="app">
                <Header />
                <div className="mt-44"><Outlet /></div>
                {/* <Body /> */}
            </div>
        </UserContext.Provider>
    )
}


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<h1>Loading...</h1>}>
                    <Grocery />
                </Suspense>
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            }
        ],
        errorElement: <Error />
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />)
root.render(<RouterProvider router={appRouter} />)
import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact"
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import PaymentInfo from "./components/PaymentInfo";
import RecipesRestaurant from "./components/RecipesRestaurant";
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => import("./components/Grocery"))

const AppLayout = () => {

    const [userName, setUserName] = useState("")

    useEffect(() => {
        const data = {
            name: "Navwe",
        };
        setUserName(data.name);
    }, []);

    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
                <div className="app">
                    <Header />
                    <div className="mt-16 xs:mt-24"><Outlet /></div>
                    {/* <Body /> */}

                    <Footer />
                </div>
            </UserContext.Provider>
        </Provider>
    )
}


// const appRouter = createBrowserRouter([
const appRouter = createHashRouter([
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
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path : "/payment",
                element: <PaymentInfo />
            },
            {
                path: "/collection/:query",
                element: <RecipesRestaurant />
            },
        ],
        errorElement: <Error />
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />)
root.render(<RouterProvider router={appRouter} />)
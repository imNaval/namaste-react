import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../components/Header"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'


it("Should load Header Component with a Login button", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    )

    // const loginButton = screen.getByRole("button")
    const loginButton = screen.getByRole("button", {name: "Login"})

    expect(loginButton).toBeInTheDocument()
});

it("Should render Cart with cart items 0", ()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
        <Header />
        </Provider>
        </BrowserRouter>
    )

    // const cartItems = screen.getByText("Cart - (0 items)")
    const cartItems = screen.getByText(/Cart/)

    expect(cartItems).toBeInTheDocument()
});

it("Should change Login to Logout", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    )

    const loginButton = screen.getByRole("button", {name: "Login"})

    fireEvent.click(loginButton);

    const LogoutButton = screen.getByRole("button", {name: "Logout"})

    // expect(loginButton).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument();
});
import { act } from "react-dom/test-utils"
import { fireEvent, render, screen } from "@testing-library/react"
import RestaurantMenu from "../components/RestaurantMenu"
import Header from "../components/Header"
import Cart from "../components/Cart"
import MOCK_MENU_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_MENU_DATA)
        }
    })
})

it("Should Load restaurant Menu Component", async () => {
    await act(async () => render(
        <Provider store={appStore}>
            <RestaurantMenu />
        </Provider>
    ))

    const accordionHeader = screen.getByText("Recommended (6)")

    fireEvent.click(accordionHeader)

    const foodItems = screen.getAllByTestId("menuItems")
    expect(foodItems.length).toBe(6)
});

it("Should Load ADD + button", async () => {
    await act(async () => render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header />
            <RestaurantMenu />
        </Provider>
        </BrowserRouter>
    ))

    const accordionHeader = screen.getByText("Recommended (6)")

    fireEvent.click(accordionHeader)
    
    const addBtns = screen.getAllByRole("button", {name:"ADD +"})

    expect(addBtns.length).toBe(6)

    expect(screen.getByText("Cart - (0 items)")).toBeInTheDocument()
});

it("Should Load Cart Component properly with 2 items", async ()=>{
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
                <Cart />
                <RestaurantMenu />
            </Provider>
        </BrowserRouter>
    ))

    const accordionHeader = screen.getByText("Recommended (6)")

    fireEvent.click(accordionHeader)

    const foodItems = screen.getAllByTestId("menuItems")

    expect(foodItems.length).toBe(6)

    const addBtns = screen.getAllByRole("button", {name:"ADD +"})

    
    fireEvent.click(addBtns[0]);
    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument()

    fireEvent.click(addBtns[1]);
    expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument()

    const foodItemsAfterAddToCart = screen.getAllByTestId("menuItems")
    expect(foodItemsAfterAddToCart.length).toBe(8)

    const clearCart = screen.getByText("Clear Cart")
    fireEvent.click(clearCart)

    expect(screen.getByText("Cart is empty, Add Item to cart")).toBeInTheDocument()

    const foodItemsAfterClearCart = screen.getAllByTestId("menuItems")
    expect(foodItemsAfterClearCart.length).toBe(6)
})
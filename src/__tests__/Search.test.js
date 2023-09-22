import { fireEvent, render, screen } from "@testing-library/react"
import Body from "../components/Body"
import MOCK_DATA from "../mocks/mockResList.json"
import { act } from "react-dom/test-utils"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA)
        }
    })
});

it("Should search for burger in all restaurant card", async () => {
    // render(<Body />)
    await act(async () => render(
        <BrowserRouter>
            <Body />
        </BrowserRouter>)
    )

    const searchBtn = screen.getByRole("button", {name: "Search"})
    expect(searchBtn).toBeInTheDocument()

    const searchInput = screen.getByTestId("searchInput")
    expect(searchInput).toBeInTheDocument()

    fireEvent.change(searchInput, {target: {value: "burger"}})

    fireEvent.click(searchBtn)

    const cards = screen.getAllByTestId("resCard")
    expect(cards.length).toBe(4);
});

it("Should filter Top Rated Restaurant cards", async()=>{
    await act(async ()=> render(<BrowserRouter>
        <Body />
    </BrowserRouter>))

    const filterBtn = screen.getByRole("button", {name: "Top Rated Restaurants"})
    expect(filterBtn).toBeInTheDocument()

    const cardBeforeFilter = screen.getAllByTestId("resCard");
    expect(cardBeforeFilter.length).toBe(20)

    fireEvent.click(filterBtn)

    const cardAfterFilter = screen.getAllByTestId("resCard")
    expect(cardAfterFilter.length).toBe(11)
})
import RestaurantCard, {withOfferLabel} from "../components/RestaurantCard"
import { restaurantData } from "../utils/mockData"
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'


it("Should render RestaurantCard Component with props Data", ()=>{
    render(<RestaurantCard resData={restaurantData[0]} />);

    const resName = screen.getByText("Rominus Pizza & Burger")

    expect(resName).toBeInTheDocument()
});

// it("Should render Restaurant Card with Promoted label", ()=>{
// })

it("Should render Restaurant Card with Discount label", ()=>{
    const ResWithOfferLabel = withOfferLabel(RestaurantCard);

    render(<ResWithOfferLabel resData={restaurantData[0]} />)

    const offerLabel = screen.getByText("₹125 OFF ABOVE ₹249")

expect(offerLabel).toBeInTheDocument()
});
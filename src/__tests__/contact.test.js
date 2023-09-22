import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Contact from "../components/Contact"

describe("Contact us component testing", ()=>{

    beforeAll(()=>{
        // console.log("Run Before All")
    });

    beforeEach(()=>{
        // console.log("Run Before Each")
    });

    afterAll(()=>{
        // console.log("Run After All")
    });

    afterEach(()=>{
        // console.log("Run After Each")
    });
    

    it("Should load contact us component", ()=>{
        render(<Contact />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    it("Should load button in contact us component", ()=>{
        render(<Contact />)

        const button = screen.getByRole("button")
        // const button = screen.getByText("Submit")

        expect(button).toBeInTheDocument();
    });

    test("Should load input box with placeholder name", ()=>{
        render(<Contact />)
    
        const inputBox = screen.getByPlaceholderText("name")
    
        expect(inputBox).toBeInTheDocument();
    });
    
    test("Should load 2-input boxes on the contact component", ()=>{
        render(<Contact />)
    
        const inputBoxes = screen.getAllByRole('textbox')
    
        // console.log(inputBoxes)
        // console.log(inputBoxes[0])
    
        expect(inputBoxes.length).toBe(2)
        // expect(inputBoxes.length).not.toBe(4) //its also ok
    });
});

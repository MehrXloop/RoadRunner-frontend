import {render ,screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import NavBar from "./NavBar"



describe("testing navbar component",()=>{
    test("that it render logo properly",()=>{
        render(<MemoryRouter><NavBar/></MemoryRouter>);

        const logoElement = screen.getByRole('img', {  name: /logo/i})
        expect(logoElement).toBeInTheDocument();
    })
})
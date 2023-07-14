import {render ,screen } from "@testing-library/react"
import App from "./App"



describe("testing app component",()=>{
    test("that it render all things properly",()=>{
        render(<App/>);

        const appElement = screen.getByTestId("app")
        expect(appElement).toBeInTheDocument();
    })
})
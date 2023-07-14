import { render, screen , fireEvent} from "@testing-library/react"
import CarDetail from "./CarDetail"
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


describe("testing carDetail component", () => {
    // test("that it navigates to the booking form when click on rent now button", () => {
    //     const navigate = jest.fn();
    //     useNavigate.mockReturnValue(navigate);
    //     render(<CarDetail />)
    //     const startOverButton = screen.getByRole("button");
    //     fireEvent.click(startOverButton);
    //     expect(navigate).toHaveBeenCalledWith('rentalForm/1');
    // })
})

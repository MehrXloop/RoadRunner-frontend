import { render, screen, fireEvent } from "@testing-library/react"
import Thanks from "./Thanks"
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe("testing Thanks component", () => {
    test("that it renders thankYou message properly", () => {
        render(<Thanks />);

        const thanksMessage = screen.getByRole('heading', { name: /thanks for your order\./i });
        expect(thanksMessage).toBeInTheDocument();
    })

    test("that it navigate to the list page when click on start over button", () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
        render(<Thanks />);
        const startOverButton = screen.getByRole("button");
        fireEvent.click(startOverButton);
        expect(navigate).toHaveBeenCalledWith('/');

    })
})


import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import CarDetail from "./CarDetail"
import { MemoryRouter } from 'react-router-dom';



describe("testing carDetail component", () => {
    const mockCarList = {
        id: 2,
        name: "Porsche Mission X",
        shortDesc: "Experience the future of exhilarating performance and sustainable luxury with the Porsche Mission X Concept Supercar.",
        longDesc: "Introducing the Porsche Mission X Concept Supercar, an electrifying vision of the future that will ignite your senses. With its sleek and aerodynamic design, this masterpiece seamlessly blends innovation and style. Powered by advanced electric technology, it delivers exhilarating performance with zero emissions. Brace yourself as the electric motors unleash a staggering 800 horsepower, propelling you from 0 to 60 mph in a blink of an eye. Inside, experience a futuristic cockpit where cutting-edge technology and luxurious comfort converge. With the Porsche Mission X Concept Supercar, redefine your driving experience and embrace the thrill of sustainable speed. Rent it today and embrace the future of automotive excellence",
        imageLink: "https://raw.githubusercontent.com/jeff-lent/roadrunnercars/main/PorscheMissionX.png",
        rentalFeePerDay: 200000
    };
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([mockCarList]),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("that it renders car information", async() => {
        render(<MemoryRouter><CarDetail /></MemoryRouter>)
        const listElements = screen.getAllByTestId('carDetail');
        expect(listElements).toHaveLength(1);
    })
})

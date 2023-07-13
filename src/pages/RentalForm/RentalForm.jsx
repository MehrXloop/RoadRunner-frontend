import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
function RentalForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [pickUpDateAndTime, setPickUpDateAndTime] = useState("");
    const [returnDateAndTime, setReturnDateAndTime] = useState("");
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:8080/cars/${id}`).then((res) => res.json()).then((result) => {
            setCar(result);

            let previousData = localStorage.getItem("myData");
            previousData = JSON.parse(previousData);
            setName(previousData?.name);
            setAddress(previousData?.address);
            setPhoneNumber(previousData?.phoneNumber);
            setDriverLicense(previousData?.driverLicense);
            setPickUpDateAndTime(previousData?.pickUpDateAndTime);
            setReturnDateAndTime(previousData?.returnDateAndTime);
        })
    }, [id])

    function calculateTotalDays() {
        if (pickUpDateAndTime && returnDateAndTime) {
            const pickupDate = new Date(pickUpDateAndTime);
            const returnDate = new Date(returnDateAndTime);
            const timeDiff = returnDate.getTime() - pickupDate.getTime();
            const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return totalDays;
        }
        return 0;
    }
    function totalPrice() {
        const days = calculateTotalDays()
        return days * car.rentalFeePerDay;
    }

    function totalPriceWithInsurance() {
        const days = calculateTotalDays();
        const total = totalPrice();
        return (days * 15000) + total;
    }

    function handleChangeCar() {
        const myData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            driverLicense: driverLicense,
            pickUpDateAndTime: pickUpDateAndTime,
            returnDateAndTime: returnDateAndTime
        }
        localStorage.setItem("myData", JSON.stringify(myData));
        console.log(myData)

        navigate("/")
    }
    function handleCheckout(){
        
    }

    return (
        <div>

            <p>price per day: {car.rentalFeePerDay}</p>
            <form>
                <label htmlFor="name">Name:</label><br />
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required /><br />
                <label htmlFor="address">Address:</label><br />
                <input type="text" id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} required /><br />
                <label htmlFor="phoneNumber">Phone Number:</label><br />
                <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required /><br />
                <label htmlFor="driverLicense">Driver License:</label><br />
                <input type="text" id="driverLicense" name="driverLicense" value={driverLicense} onChange={e => setDriverLicense(e.target.value)} required /><br />
                <label htmlFor="pickUpDateAndTime">Pick Up Date & Time:</label><br />
                <input type="datetime-local" id="pickUpDateAndTime" name="pickUpDateAndTime" value={pickUpDateAndTime} onChange={e => setPickUpDateAndTime(e.target.value)} required /><br />
                <label htmlFor="returnDateAndTime">Return Date & Time:</label><br />
                <input type="datetime-local" id="returnDateAndTime" name="returnDateAndTime" value={returnDateAndTime} onChange={e => setReturnDateAndTime(e.target.value)} required /><br />

                <label htmlFor="totalPrice">TotalDays:</label><br />
                <input type="text" value={calculateTotalDays()} readOnly /><br />


                <label htmlFor="totalPrice">total price:</label><br />
                <input type="text" value={totalPrice()} readOnly /><br />


                <label htmlFor="insurance">Want to pay for insurance per day Rs 15,000</label>
                <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} /><br />

                {checked && <>
                    <label htmlFor="totalPrice">total price with insurance:</label><br />
                    <input type="text" value={totalPriceWithInsurance()} readOnly /><br />
                </>
                }


                <button onClick={handleChangeCar}>Change Car</button>
                <button onClick={handleCheckout}>Checkout</button>

            </form>

        </div>
    )
}

export default RentalForm
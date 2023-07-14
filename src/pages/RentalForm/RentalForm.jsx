import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./RentalForm.module.css"
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
            return totalDays + 1;
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
        return (days * 15000) +
            total;
    }

    function damageWavier() {
        const days = calculateTotalDays();
        return days * 15000;
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

        navigate("/")
    }
    function handleCheckout() {
        if (checked === false) {
            const newFormInformation = {
                carId: car.id,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                driverLicense: driverLicense,
                pickUpDateAndTime: pickUpDateAndTime,
                returnDateAndTime: returnDateAndTime,
                totalPrice: totalPrice()
            }
            fetch('http://localhost:8081/rentalForm/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFormInformation)
            })
                .then(response => {
                    console.log("done")
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });

        }
        else {
            const newFormInformationWithInsurance = {
                carId: car.id,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                driverLicense: driverLicense,
                pickUpDateAndTime: pickUpDateAndTime,
                returnDateAndTime: returnDateAndTime,
                totalPrice: totalPriceWithInsurance()
            }
            fetch('http://localhost:8081/rentalForm/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFormInformationWithInsurance)
            })
                .then(response => {
                    console.log("done")

                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
            const DamageWavier = {
                carId: 6,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                driverLicense: driverLicense,
                pickUpDateAndTime: pickUpDateAndTime,
                returnDateAndTime: returnDateAndTime,
                totalPrice: damageWavier()
            }
            fetch('http://localhost:8081/rentalForm/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DamageWavier)
            })
                .then(response => {
                    console.log("done")

                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
        }

        navigate("/thanks")
        localStorage.clear()
    }

    return (
        <div>
            <div className={styles.container} data-testid="carDetail">
                <div>
                    <h1>Your Chosen Car Information</h1>
                </div>
                <div className={styles.info}>
                    <img src={car.imageLink} alt="" width="150" />
                    <h4>Name: {car.name}</h4>
                    <p>price per day: {car.rentalFeePerDay}</p>
                </div>

            </div>
            <form className={styles.containerForm} data-testid="form">
                <h1>Rental Form</h1>
                <div className={styles.containerFormInput}>
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required data-testid="name" /><br />
                    <label htmlFor="address">Address:</label><br />
                    <input type="text" id="address" name="address" value={address} onChange={e => setAddress(e.target.value)} required data-testid="address" /><br />
                    <label htmlFor="phoneNumber">Phone Number:</label><br />
                    <input type="number" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required data-testid="number" /><br />
                    <label htmlFor="driverLicense">Driver License:</label><br />
                    <input type="text" id="driverLicense" name="driverLicense" value={driverLicense} onChange={e => setDriverLicense(e.target.value)} required data-testid="license" /><br />
                    <label htmlFor="pickUpDateAndTime">Pick Up Date & Time:</label><br />
                    <input type="datetime-local" id="pickUpDateAndTime" name="pickUpDateAndTime" value={pickUpDateAndTime} onChange={e => setPickUpDateAndTime(e.target.value)} required /><br />
                    <label htmlFor="returnDateAndTime">Return Date & Time:</label><br />
                    <input type="datetime-local" id="returnDateAndTime" name="returnDateAndTime" value={returnDateAndTime} onChange={e => setReturnDateAndTime(e.target.value)} required /><br />
                    <label htmlFor="totalPrice">Total Price:</label><br />
                    <input type="text" value={totalPrice()} readOnly /><br />

                    <div className={styles.checkboxWrapper}>
                        <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className={styles.checkbox} /><br />
                        <label htmlFor="insurance">Damage Protection Rs 15,000</label><br />
                    </div>

                    {checked && <>
                        <label htmlFor="totalPrice">Total price with insurance:</label><br />
                        <input type="text" value={totalPriceWithInsurance()} readOnly /><br />
                    </>
                    }
                </div>

                <div className={styles.btnWrapper}>
                    <button onClick={handleChangeCar}>Change Car</button>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>

            </form>

        </div>
    )
}

export default RentalForm
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./Car.module.css"
function Car({ car }) {
    const navigate = useNavigate()

    function handleRent(id) {
        navigate(`rentalForm/${id}`)
    }
    return (
        <li className={styles.container}>
            <h1><Link to={`/${car.id}`}>{car.name}</Link> </h1>
            <div className={styles.flexContainer}>
                <div>
                    <img src={car.imageLink} alt={car.name} width="300" />
                </div>
                <div>
                    <p>About This Car: <span>{car.shortDesc}</span></p>
                    <p>Rental Price Per Day: <span>{car.rentalFeePerDay.toLocaleString()}</span></p>
                    <button onClick={() => handleRent(car.id)}>Rent me now</button>
                </div>
            </div>
        </li>
    )
}

export default Car
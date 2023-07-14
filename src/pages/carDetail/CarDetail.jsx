import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./CarDetail.module.css"
function CarDetail() {
    const [car, setCar] = useState({})
    const { id } = useParams();
    const navigate = useNavigate()

    function handleRent(id) {
        navigate(`/rentalForm/${id}`)
    }

    useEffect(() => {
        fetch(`http://localhost:8080/cars/${id}`).then((res) => res.json()).then((result) => {
            setCar(result);
        })
    }, [id])

    return (
        <div className={styles.container} data-testid="carDetail">
            <h1>{car.name}</h1>
            <div className={styles.containerImage}>
                <img src={car.imageLink} alt={car.name} />
            </div>
            <div>
                <p>Description:</p>
            </div>
            <p className={styles.longDesc}>{car.longDesc}</p>
            <p>Rental Price Per Day: <span>{car.rentalFeePerDay}</span></p>

            <button onClick={() => handleRent(car.id)}>Rent me now</button>
        </div>
    )
}

export default CarDetail
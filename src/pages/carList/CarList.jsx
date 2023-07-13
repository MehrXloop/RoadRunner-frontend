import React, { useEffect, useState } from 'react'
import Car from '../../components/car/Car';

function CarList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/cars/all").then((res) => res.json()).then((result) => {
            setLoading(false);
            setCars(result);
        })
    }, [loading])

    return (
        <div>
            <h1>Cars For Rent</h1>
            <ul>
                {loading ? "loading" : cars.map((car, index) => {
                    if (index <= 4) {
                        return <Car car={car} key={car.id} />
                    }
                })}
            </ul>
        </div>
    )
}

export default CarList
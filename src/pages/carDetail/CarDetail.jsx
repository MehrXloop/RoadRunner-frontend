import React ,{ useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom'
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
            console.log(result);
        })
    }, [id])

    return (
        <div>
            <h1>{car.name}</h1>
            <img src={car.imageLink} alt={car.name} />
            <p>{car.longDesc}</p>
            <p>RS {car.rentalFeePerDay}</p>

            <button onClick={() => handleRent(car.id)}>Rent me now</button>
        </div>
    )
}

export default CarDetail
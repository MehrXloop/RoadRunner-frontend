import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
function Car({car}) {
    const navigate = useNavigate()

    function handleRent(id){
         navigate(`rentalForm/${id}`)
    }
  return (
    <li>
    <h1><Link to={`/${car.id}`}>{car.name}</Link> </h1>
    <img src={car.imageLink} alt={car.name} width="300"/>
    <p>{car.shortDesc}</p>
    <p>{car.rentalFeePerDay}</p>

    <button onClick={()=>handleRent(car.id)}>Rent me now</button>
    </li>
  )
}

export default Car
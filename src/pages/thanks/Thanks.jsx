import React from 'react'
import { useNavigate } from 'react-router-dom'

function Thanks() {
   const navigate = useNavigate();
  function handleStartOver(){
    navigate("/")
  }

  return (
    <div>
      <h1>Thanks for your order.</h1>
      <button onClick={handleStartOver}>Start Over</button>
    </div>
  )
}

export default Thanks
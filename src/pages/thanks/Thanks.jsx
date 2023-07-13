import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Thanks.module.css"

function Thanks() {
   const navigate = useNavigate();
  function handleStartOver(){
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <h1>Thanks for your order.</h1>
      <button onClick={handleStartOver}>Start Over</button>
    </div>
  )
}

export default Thanks
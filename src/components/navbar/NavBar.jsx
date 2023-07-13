import React from 'react'
import styles from './NavBar.module.css'
import logo from "./logo.png"
function NavBar() {
    return (
        <div className={styles.logo}>
            <img src={logo} alt="logo" />
        </div>
    )
}

export default NavBar
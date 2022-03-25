import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Landing.module.css'
 
export default function LandingPage () {
    return (
        <div  className={styles.div}>
            <h1 className={styles.h1}>Bienvenidos a Henry Dogs</h1>
            <Link to='/home'>
                <button className={styles.button}>Ingresar</button>
            </Link>
        </div>
        )
}
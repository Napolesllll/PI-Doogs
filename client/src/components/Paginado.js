import React from "react";
import styles from "../styles/Paged.module.css";

export default function Paged ({ dogsPerPage, allDogs, pagedTotal }) {
    const pageNumber = []; 
    const paginado = Math.ceil(allDogs/dogsPerPage); //el numero redondo que resulta de dividir todos los dogs x la cantidad de dogs x página OSEA 8 POR PAGINA

    for (let i = 1; i <= paginado; i++) {
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className={styles.paged}>                                                     
                {pageNumber?.map(num =>( //si tengo ese arreglo, mapeálo y devolveme cada número que te devuelva el paginado    
                <div className={styles.listContainer} key={num}>
                  <li className={styles.number} key={num}>
                     <p href='#' onClick={()=> pagedTotal(num)} className={styles.link}>{num}</p>  
                  </li>
                </div>
                ))}         
            </ul>                                                
        </nav>
    )  //num es cada una de las páginas que necesito para renderizar todos mis dogs
}
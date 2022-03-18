import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado'

export default function Home () {
    //me traigo el estado de mi action con useSelector para despacharlo posteriormente

    const dispatch = useDispatch(); // declaro la accion a despachar
    const allDogs = useSelector((state) => state.dogs) // traigo todo lo que esta en el estado (de parmas)
    // console.log(allDogs)

    //paginado
    const [currentPage, setCurrentPage] = useState(1)  //le paso el estado local con la primer página que se renderiza
    const [ dogsPerPage ] = useState (8)  //cuántos personajes quiero por página
    const indexOfLastDog = currentPage * dogsPerPage     //cuando empieza será 8 
    const indexOffirstDog = indexOfLastDog - dogsPerPage   // 0
    const currentDogs = allDogs.slice(indexOffirstDog, indexOfLastDog)  //slice toma una porción del arreglo dependiendo lo que le estoy pasando por parámetro

    const pagedTotal = (pageNumber) => {  // renderiza segun el numero recibido
      setCurrentPage(pageNumber);
    }

    useEffect(()=>{  // la despacho cuando la invoquen 
        dispatch(getDogs())
    },[dispatch])

    function handleClick (e){ // 
        e.preventDefault();
        dispatch(getDogs());
    }
    

    return(
       <div>
           <Link to ='/dogs'>Create Dog</Link>
           <h1>Aguante Perros de raza ↓</h1>
           <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los perros              
           </button> 
       <div>

        <select onClick={e => {handleClick(e)}}>
          <option value="All">All</option>
          <option value="false">Real</option>
          <option value="true">Created</option>
        </select>

        <select onClick={e => {handleClick(e)}}>
          <option value="x">Order...</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="weight_min">Weight min</option>
          <option value="weight_max">Weight max</option>
        </select>

        <Paginado 
        dogsPerPage = {dogsPerPage}
        allDogs = {allDogs.length}
        pagedTotal = {pagedTotal}
        />

        {
         currentDogs?.map((el) => {  // finalmente mapea y me entrega la data 
          
            return (
              <Link to={"/home/" + el.id}>
                <Card image={el.image} name={el.name} temperament={el.temperaments} weight={el.weight} />
              </Link>
            );
          })
         }
       </div>
       </div>
    )
}
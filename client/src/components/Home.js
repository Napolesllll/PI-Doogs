import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'

export default function Home () {
    //me traigo el estado de mi action con useSelector para despacharlo posteriormente

    const dispatch = useDispatch(); // declaro la accion a despachar
    const allDogs = useSelector((state) => state.dogs) // traigo todo lo que esta en el estado (de parmas)

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
           <button onclick={e => {handleClick(e)}}>
                Volver a cargar todos los perros              
           </button> 
       <div>

        <select>
          <option value="All">All</option>
          <option value="false">Real</option>
          <option value="true">Created</option>
        </select>

        <select >
          <option value="x">Order...</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="weight_min">Weight min</option>
          <option value="weight_max">Weight max</option>
        </select>

        {
          allDogs && allDogs.map( (el) => {  // finalmente mapea y me entrega la data 
            return(
              <Card image={el.image} name={el.name} temperament={el.temperament} weight={el.weight}/>
            )
          })
        }

       </div>
       </div>
    )
}
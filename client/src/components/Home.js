//importo los hook que voy a usar de react
import React, { useState, useEffect } from "react";
//importo los hooks de react-redux (previamente se instala npm i react-redux)
import { useSelector, useDispatch } from "react-redux";
//importo las actions que necesito en este componente
import { getDogs, FilterDogsByTemperament, GetTemperaments, FilterByName, FilterByWeight, FilterCreated } from '../actions';
//importo los componentes que voy a usar
import { Link } from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from "./SearchBar";

import '../styles/Home.css'
export default function Home () {
    //me traigo el estado de mi action con useSelector para despacharlo posteriormente

    const dispatch = useDispatch(); // declaro la accion que despacha
    const allDogs = useSelector((state) => state.dogs); // traigo todo lo que esta en el estado (de parmas)
    const allTemperaments = useSelector((state) => state.temperament);
    

    //-------- PAGINADO -------- ©\
    const [currentPage, setCurrentPage] = useState(1)  //le paso el estado local con la primer página que se renderiza
    const [ dogsPerPage ] = useState (8)  //indico cuántos perros quiero por página
    const indexOfLastDog = currentPage * dogsPerPage     //cuando empieza será 8 
    const indexOffirstDog = indexOfLastDog - dogsPerPage   // 0
    const currentDogs = allDogs.slice(indexOffirstDog, indexOfLastDog)  //slice toma una porción del arreglo dependiendo lo que le estoy pasando por parámetro
    const [order, setOrder] = useState('');

    const pagedTotal = (pageNumber) => {  // renderiza segun el numero recibido
      setCurrentPage(pageNumber);  //cuando setea la página los índices cambian y el slide se va modificando   
    }

    useEffect(()=>{  // la traigo para despacharla cuando la invoquen 
        dispatch(getDogs())
    },[dispatch]);

    useEffect(() => {
       dispatch(GetTemperaments())
    },[dispatch]); 
  
   function handleClick (e){ // 
        e.preventDefault();
        setCurrentPage(1)
        dispatch(getDogs());
    }

    function handleFilterTemperaments(e) {
      e.preventDefault();
      setCurrentPage(1);
      dispatch(FilterDogsByTemperament(e.target.value))
    }
    
    function handleFilterByName(e) {
      e.preventDefault();
      dispatch(FilterByName(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordinate ${e.target.value}`);
    }

    function handleFilterByWeight(e) {
      e.preventDefault();
      dispatch(FilterByWeight(e.target.value));
      setCurrentPage(1);
      setOrder(`Ordinate ${e.target.value}`);
    }

    function handleFilterCreated(e) {     //declaro una función que es un handle del filter del dog creado o de api
      e.preventDefault();    //esta funcion es la que paso en el select y cuando (e) se modifique ejecuta esta función
      setCurrentPage(1);    //despacho la acción llamada FilterCreated y accedo al valor de cada una de las opcioneS
      dispatch(FilterCreated(e.target.value))  //de value con el e.target.value - dependiendo de cuál clickea el usuario
  }
    return(
       <div className='content'>
           <Link  to="/dog">
                <button className='buttonCreate2'>Create New Dog</button>
            </Link>
           <button  className='reload' onClick={e => {handleClick(e)}}>
                Reload Dogs              
           </button> 
           <h1 className='titul'>Club Perruno ↓</h1>
           <SearchBar />
       <div>

       <div className='Filters'>
                <select onChange={e => handleFilterByName(e)}>
                    <option value='default'>Sort by Name</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={e => handleFilterByWeight(e)}>
                    <option value='default'>Sort by Weight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All Dogs</option>
                    <option value='api'>Existent Dogs</option>
                    <option value='created'>Created Dogs</option>
                </select>
                <select onChange={(e) => handleFilterTemperaments(e)}>
                    <option value="all">All Temperaments</option>
                    {allTemperaments?.map((elem) => (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>
                    ))}
                </select>
            </div>

        <Paginado 
        dogsPerPage = {dogsPerPage}
        allDogs = {allDogs.length}
        pagedTotal = {pagedTotal}
        />
        
        { currentDogs?.map( (el) => {
             return(
                 <div key={el.id}>
                    <Link  to={'/dogs/' + el.id}>
                      <Card image={el.image} name={el.name} temperament={el.temperament? el.temperament: el.temperaments && el.temperaments.map((el) => el.name.concat(" "))} weight={el.weight}  key={el.id} />
                     </Link>
                 </div>
                    );
        })}
       </div>
       </div>
    )
}
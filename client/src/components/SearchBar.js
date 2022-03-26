import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getDogName } from '../actions';

import '../styles/SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange (e) {
        e.preventDefault();    
        setName(e.target.value); //lo que está tipeando el usuario va a ser mi estado local name
    }
 
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getDogName(name));
        setName();  //para que cuando ya se hizo la busqueda no me siga mostrando el nombre ingresado, seteo el nombre en comillas
       }
     
    return(
        <div className='conten'>
            <input 
             className='buscador'
              type ='text'
              placeholder='Buscar...' 
              onChange={(e) => handleInputChange(e)} 
            />
            <button  className='buscar'type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}
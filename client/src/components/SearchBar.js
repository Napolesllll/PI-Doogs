import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogName } from '../actions';

import '../styles/SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const nombres = useSelector((state) => state.name)    
    
    function handleInputChange (e) {
      e.preventDefault();    
      setName(e.target.value); //lo que está tipeando el usuario va a ser mi estado local name
    }
 
    function handleSubmit (e) {
        e.preventDefault();
        if(nombres !== name){
            alert('Dog not found')
            setName('');   
        }else{
            dispatch(getDogName(name));
            setName('');  
        }
       }
     
    return(
        <div className='conten'>
            <input 
             value = {name}
             className='buscador'
             type ='search'
             placeholder='Buscar...' 
             onChange={(e) => handleInputChange(e)} 
              
            />
            <button  className='buscar'type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}
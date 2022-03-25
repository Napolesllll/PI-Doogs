import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTemperaments, resState, postDogs } from "../actions/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { validation } from "./Errores";
import '../styles/CreateDog.css'
import dogForm from '../img/cachorroForm.png'


export default function DogCreate() {
  const dispatch = useDispatch();
  const  allTemperaments= useSelector((e) => e.temperament);

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlife_span: "",
    maxlife_span: "",
    image: "",
    temperament: [],
    createdInBd: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(GetTemperaments());
    dispatch(resState(resState));
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
      let crear = {
        name: input.name,
        height: `${input.minHeight} - ${input.maxHeight}`,
        weight: `${input.minWeight} - ${input.maxWeight}`,
        life_span: `${input.minlife_span} - ${input.maxlife_span} years`,
        image: input.image,
        temperament: input.temperament.join(", "),
      };
      dispatch(postDogs(crear));
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minlife_span: "",
        maxlife_span: "",
        image: "",
        temperament: [],
        createdInBd: true,
      });
      if(!crear.name || !crear.temperament){ //si no tiene nombre o no tiene temperament envia un alert con msn de error
         alert('requires all the information')
      }else{
        alert('Dog Create!!')

      }
  }
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
          [e.target.name]: e.target.value,
      })
    )
  }

  function handleSelectTemperament(e) { 
  if(!input.temperament.includes(e.target.value)){
  
    setInput({
      ...input,   // seteo el input para ir guardando lo que el usuario seleccione
      temperament: [...input.temperament, e.target.value],
    });
  } 
   
  }
  function handleDelete(e) {
  
    e.preventDefault();
       setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e.target.innerText),
      
    });
  }

  return (
    <div className="fromPerfil">
      <div >
        <div className='cont1'>
          
          <Link to="/home">
            <button className="boton5">
              Home
            </button>
          </Link>
        </div>
        <div>
          <h1 className="titleForm">Create Dog</h1>
          <form className="fromPerfil" onSubmit={resState}>
          
            <div className="">
              <label className="title5">Name:</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.name}</strong>

              <label className="title5">Height min:</label>
              <input
                type="number"
                name="minHeight"
                value={input.minHeight}  // ALTURA MIN
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minHeight}</strong>

              <label className="title5">Height max:</label>
              <input
                type="number"
                name="maxHeight"
                value={input.maxHeight}  // ALTURA MAX
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.maxHeight}</strong>

              <label className="title5">Weight min:</label>
              <input
                type="number"
                name="minWeight"
                value={input.minWeight} // PESO MIN
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minWeight}</strong>

              <label className="title5">Weight max:</label>
              <input
                type="number"
                name="maxWeight"
                value={input.maxWeight} // PESO MAX
                onChange={(e) => handelChange(e)}
              ></input><br/><strong>{errors.maxWeight}</strong>

              <label className="title5">Life span min:</label>
              <input
                type="number"
                name="minlife_span"
                value={input.minlife_span} // TIEMPO DE VIDA MIN
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.minlife_span}</strong>

              <label className="title5">Life span max:</label>
              <input
                type="number"
                name="maxlife_span"
                value={input.maxlife_span} // TIEMPO DE VIDA MAX
                onChange={(e) => handelChange(e)}
              /><br/><strong>{errors.maxlife_span}</strong>

              <label name="image" className="title5">
                Image:
              </label>
              <input
                name="image"
                value={input.image}
                placeholder='URL'
                onChange={(e) => handelChange(e)}
              ></input>

              <label className="title5" value="temperament" name="temperament">
                {" "}
                Temperament:{" "}
              </label>
              <select
                className="boton5"
                onChange={(e) => handleSelectTemperament(e)}
              >
                <option>Temperaments</option>
                {allTemperaments &&
                  allTemperaments.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select><br/>

              {input.temperament.map((nombre) => {
                return (
                  <div className="concatFiltro">
                  <span key={nombre}>
                   
                    <button className="boton3" onClick={(nombre)=> handleDelete(nombre)}>
                      {nombre} 
                    </button>
                  </span>
                  </div>
                );  
              })}   
              
              <button
                className="boton5"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              > Create new Dog
              </button>

            </div>
          </form>
        </div>
      </div>
      <div className="imgperfil">
        <img src={dogForm} alt="perfil" />
      </div>
    </div>
  );
}
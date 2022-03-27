import axios from 'axios'; // 1) hacer pedidos
 
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const RES_STATE = "RES_STATE";

export function getDogs () {
    return async function (dispatch){
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }

}
export function GetTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament", );
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        })
    }
}
 //lo que llega en payload es lo que le mando desde el componente, el value del select
export function FilterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload,
    }
}

export function FilterByName(payload) {
    return {
        type: 'FILTER_BY_NAME',
        payload,
    }
}

export function FilterByWeight(payload) {
    return {
        type: 'FILTER_BY_WEIGHT',
        payload,
    }
}

export function FilterCreated(payload) {  //filtra si son creados o son de la api
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}
export function getDogName(name) {    //acá traigo del back-end los dogs que coincidan con el nombre pasado por query
    return async function (dispatch){
        try{  //mi ruta del back mas lo que el usuario le pase como nombre en la barra de búsqueda
            let json = await axios.get("http://localhost:3001/dogs?name=" + name);   
            return dispatch({
                type: 'GET_DOG_NAME', // accion que recibe el nombre pasado y lo busca en la data
                payload: json.data
            })
        } catch(error){
            console.name('raza no encontrada', error)
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/dogs/'+id)
        return dispatch({
            type:"GET_DETAIL",
            payload: json.data,
        })
    }
}
  
export function postDogs(payload){
    return async function(){
        const create = await axios.post('http://localhost:3001/dog',payload);
        return create;
    }
}



export function resState(){
    return {
        type:"RES_STATE",
    }
}
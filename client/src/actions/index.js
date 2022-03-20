import axios from 'axios'; // 1) hacer pedidos
 
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_DOG_NAME = "GET_DOG_NAME";

export function getDogs () {
    return async function (dispatch){
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }

}
export function GetTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament", {});
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
        try{
            let json = await axios.get("http://localhost:3001/dogs?name=" + name);    //mi ruta del back mas lo que el usuario le pase como nombre en la barra de búsqueda
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        } catch(error){
            console.name(error)
        }
    }
}
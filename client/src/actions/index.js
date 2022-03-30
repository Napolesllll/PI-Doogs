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
export const DELETE = "DELETE";

//me trae todos los dogs
export function getDogs () {
    return async function (dispatch){
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }

}
//me trae los temperamentos
export function GetTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament", );
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        })
    }
}
 //filtra los dogs por termperamento 
export function FilterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload,
    }
}
// filtrado de ordenamiento asc o desc
export function FilterByName(payload) {
    return {
        type: 'FILTER_BY_NAME',
        payload,
    }
}
//filtra por peso
export function FilterByWeight(payload) {
    return {
        type: 'FILTER_BY_WEIGHT',
        payload,
    }
}
// fritra si son de la api o los creados
export function FilterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}
// filtra y busca por nombre lo que le pase por query
export function getDogName(name) {    
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
// accede a la informacion detallada
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

export function deleteDog(id) {
    return (dispatch) => {
      dispatch({ type: DELETE, payload: id });
    };
  }
  
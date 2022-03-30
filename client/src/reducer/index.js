
import { GET_DOGS, FILTER_BY_TEMPERAMENT, GET_TEMPERAMENTS, FILTER_BY_NAME, FILTER_BY_WEIGHT, FILTER_CREATED, GET_DOG_NAME, GET_DETAIL } from '../actions/index';

const initialState = {
    dogs : [],
    temperament: [],
    allDogs : [],
    detail: [],
}


function rootReducer (state = initialState, action) { //enviando info al estado
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperament: action.payload,
            };

        case 'POST_DOG':  //post dog tiene que estar en el reducer pero no hace nada, porque yo creo un dog en una ruta nueva
            return {
                ...state,
            }

        case FILTER_BY_TEMPERAMENT:

            let allDog = state.allDogs;
            let temperamentsFiltered = action.payload === "all"  ? allDog: allDog.filter((elem) =>
            //si existe ese temp devueve el estado con todos los dog que coincidan
              elem.temperament?.includes(action.payload) 
                );
                 return {
                       ...state,
                        dogs: temperamentsFiltered,
                     };
    

        case FILTER_BY_NAME:
          const filterName = action.payload === 'A-Z' ?    //Si el valor es "A-Z"
           state.dogs.sort(function (a, b) {  //sort compara dos valores, accedemos al name y los compara, y los coloca a la derecha o a la izquierda, antes o despues en el arreglo dependiendo si son mas grandes o mas chicos
             if (a.name > b.name) {
                 return 1;
             }
             if (b.name > a.name) {
                 return -1;
             }
                 return 0                           //si son iguales los deja como está
            }) :                                   // y si no ordeno de Z-A
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: filterName,
            };

        case FILTER_BY_WEIGHT:
          const filterWeight = action.payload === 'asc' ?
           state.dogs.sort(function (a, b) {
                 return parseInt(a.weight) - parseInt(b.weight);
           }) :
           state.dogs.sort(function (a, b) {
                return parseInt(b.weight) - parseInt(a.weight);
           });
            return{
                 ...state,
                dogs: filterWeight,
            };

        case FILTER_CREATED:   //si el valor de mi acción es created, traigo todos aquellos creados en la DB  
       
          const createdFilter = action.payload === 'created'? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)   //primero siempre filtro el arreglo que tiene todo
                return {         //retorno el estado, y si mi acción vale All traigo los de la api y los filtrados
                    ...state,
                    dogs: action.payload === 'all' ? state.allDogs : createdFilter 
                };
        case GET_DOG_NAME:
                return {
                    ...state,
                    dogs: action.payload,  
                    //lo renderizo en el array dogs, este es el filtrado de buscar por nombre que hice en el back
                }

        case GET_DETAIL: //al hacer click sobre un perro accedo a sus detalles
            return {
                ...state,
                detail: action.payload,    // a detail que es el estado inicial se le  pasa action.payload
            }
        // case DELETE:
        //     state.allDogs = state.allDogs.filter(
        //         (el) => el.id !== action.payload
        //       );
        
            //   return { ...state };
        
            default: 
                return state;
    }
}

export default rootReducer;
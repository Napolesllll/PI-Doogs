import axios from 'axios'; // 1) hacer pedidos
 
export const GET_DOGS = "GET_DOGS";

export function getDogs () {
    return async function (dispatch){
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }

}

import { GET_DOGS } from '../actions/index'

const initialState = {
    dogs : []
}


function rootReducer (state = initialState, action) { //enviando info al estado
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
            default: 
                return state;
    }
}

export default rootReducer;
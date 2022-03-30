import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // simplifica un poco 
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//Thunk es un middleware que le permite invocar creadores de acciones que devuelven una función en vez de un objeto.
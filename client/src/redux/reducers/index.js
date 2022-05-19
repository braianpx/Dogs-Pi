import { GET_BREEDS, GET_DETAIL_BREED} from '../actions/actionTypes'

const initialState ={
    breeds:[],
    detailBreed:{},
    breedsFavourites:[],

}

const rootReducer = (state = initialState, action) =>{
switch(action.type){
case GET_BREEDS:
return{
    ...state,
    breeds: action.payload 
}
case GET_DETAIL_BREED:
return{
    ...state,
    detailBreed: action.payload
}
default:
return state;
}
}

export default rootReducer;
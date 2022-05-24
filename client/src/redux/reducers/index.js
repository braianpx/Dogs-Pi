import { GET_BREEDS, GET_DETAIL_BREED, GET_BREEDS_FILTER,
     GET_TEMPERAMENTS, FILTER_EXISTING, FILTER_CREATED,
     FILTER_BY_TEMPERAMENT, FILTER_BY_AZ,FILTER_WEIGHT,
    } from '../actions/actionTypes'

const initialState ={
    breeds:[],
    detailBreed:{},
    breedsFavourites:[],
    temperaments:[],

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
case GET_BREEDS_FILTER:
    return{
        ...state,
        breeds: action.payload
    }
case GET_TEMPERAMENTS:
    return{
        ...state,
        temperaments: action.payload
    }
case FILTER_CREATED:
    return{
        ...state,
        breeds: state.breeds.filter((el) => { if(!Number(el.id)){ return el} })
    }
case FILTER_EXISTING:
    return {
        ...state,
        breeds: state.breeds.filter((el) => { if(Number(el.id)){ return el} })
    }
case FILTER_BY_TEMPERAMENT:
    return{
        ...state,
        breeds: action.payload
    }
case FILTER_BY_AZ:
    return{
        ...state,
        breeds: action.payload
    }
case FILTER_WEIGHT:
    return{
        ...state,
        breeds: action.payload
    }
default:
return state;
}
}

export default rootReducer;